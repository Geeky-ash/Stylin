/* ============================================================
   STYLIN' — Backend API Server
   Express server that handles:
   1. Image upload → temporary cloud hosting (freeimage.host)
   2. SerpApi Google Lens product search
   ============================================================ */

import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fetch from 'node-fetch';
import FormData from 'form-data';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const SERPAPI_KEY = process.env.SERPAPI_KEY;

// ─── Middleware ───
app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Multer: store uploaded files in memory (no disk writes)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB max
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

// ─── Helper: Upload image to freeimage.host (free, no API key required for public demo key) ───
async function uploadToImageHost(buffer, mimetype) {
  const base64 = buffer.toString('base64');

  const form = new FormData();
  form.append('key', '6d207e02198a847aa98d0a2a901485a5'); // freeimage.host public API key
  form.append('action', 'upload');
  form.append('source', base64);
  form.append('format', 'json');

  const res = await fetch('https://freeimage.host/api/1/upload', {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    throw new Error(`Image host returned ${res.status}`);
  }

  const data = await res.json();

  if (data.status_code !== 200 || !data.image?.url) {
    throw new Error(data.error?.message || 'Image upload failed');
  }

  return data.image.url;
}

// ─── Helper: Call SerpApi Google Lens ───
async function searchGoogleLens(imageUrl) {
  const params = new URLSearchParams({
    engine: 'google_lens',
    url: imageUrl,
    api_key: SERPAPI_KEY || '',
  });

  const res = await fetch(`https://serpapi.com/search.json?${params}`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SerpApi returned ${res.status}: ${text}`);
  }

  return res.json();
}

// ─── POST /api/analyze — Main endpoint ───
app.post('/api/analyze', upload.single('image'), async (req, res) => {
  try {
    // Step 1: Validate
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    if (!SERPAPI_KEY) {
      return res.status(500).json({ error: 'SerpApi key not configured' });
    }

    console.log(`[Analyze] Received image: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)}KB)`);

    // Step 2: Upload image to get public URL
    console.log('[Analyze] Uploading to image host...');
    const publicUrl = await uploadToImageHost(req.file.buffer, req.file.mimetype);
    console.log(`[Analyze] Public URL: ${publicUrl}`);

    // Step 3: Call SerpApi Google Lens
    console.log('[Analyze] Calling SerpApi Google Lens...');
    const lensData = await searchGoogleLens(publicUrl);
    console.log(`[Analyze] Got ${lensData.visual_matches?.length ?? 0} visual matches`);

    // Step 4: Map visual_matches to our product format
    const products = (lensData.visual_matches || []).slice(0, 12).map((match, i) => ({
      id: i + 1,
      title: match.title || 'Untitled Product',
      price: match.price?.value || null,
      extractedPrice: match.price?.extracted_value || null,
      currency: match.price?.currency || '$',
      source: match.source || '',
      sourceIcon: match.source_icon || null,
      link: match.link || '#',
      thumbnail: match.thumbnail || null,
      inStock: match.in_stock ?? null,
      position: match.position || i + 1,
    }));

    // Step 5: Extract knowledge graph / style info if available
    const styleInfo = {
      searchTitle: lensData.search_metadata?.google_lens_url || null,
      knowledgeGraph: lensData.knowledge_graph || null,
      totalMatches: lensData.visual_matches?.length || 0,
    };

    res.json({
      success: true,
      imageUrl: publicUrl,
      products,
      styleInfo,
    });

  } catch (err) {
    console.error('[Analyze] Error:', err instanceof Error ? err.message : err);
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Analysis failed',
      success: false,
    });
  }
});

// ─── Health check ───
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', serpApiConfigured: !!SERPAPI_KEY });
});

// ─── Start ───
app.listen(PORT, () => {
  console.log(`\n  ✨ Stylin' API Server running on http://localhost:${PORT}`);
  console.log(`  📡 SerpApi key: ${SERPAPI_KEY ? '✓ configured' : '✗ MISSING'}\n`);
});
