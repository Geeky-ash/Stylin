/* ============================================================
   STYLIN' — API Client
   Handles communication with the Express backend.
   ============================================================ */

export interface ApiProduct {
  id: number;
  title: string;
  price: string | null;
  extractedPrice: number | null;
  currency: string;
  source: string;
  sourceIcon: string | null;
  link: string;
  thumbnail: string | null;
  inStock: boolean | null;
  position: number;
}

export interface AnalyzeResponse {
  success: boolean;
  imageUrl: string;
  products: ApiProduct[];
  styleInfo: {
    searchTitle: string | null;
    knowledgeGraph: unknown | null;
    totalMatches: number;
  };
  error?: string;
}

/** Analysis lifecycle stages */
export type AnalysisStage =
  | 'idle'
  | 'uploading'
  | 'uploaded'
  | 'identifying'
  | 'matching'
  | 'complete'
  | 'error';

/**
 * Sends an image file to the backend for AI analysis.
 * Returns product matches from Google Lens via SerpApi.
 */
export async function analyzeOutfit(
  file: File,
  onStageChange?: (stage: AnalysisStage) => void,
): Promise<AnalyzeResponse> {
  // Stage 1: Uploading image
  onStageChange?.('uploading');

  const formData = new FormData();
  formData.append('image', file);

  // Stage 2: Image uploaded, calling API
  onStageChange?.('uploaded');

  try {
    // Stage 3: AI identifying style
    onStageChange?.('identifying');

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({ error: `Server error ${res.status}` }));
      throw new Error(errData.error || `Request failed with status ${res.status}`);
    }

    // Stage 4: Matching products
    onStageChange?.('matching');

    const data: AnalyzeResponse = await res.json();

    if (!data.success) {
      throw new Error(data.error || 'Analysis failed');
    }

    // Stage 5: Complete
    onStageChange?.('complete');

    return data;

  } catch (err) {
    onStageChange?.('error');
    throw err;
  }
}
