import { useRef, useState, useEffect } from 'react';
import { AI_PHRASES } from '../data';

interface ScanningViewProps {
  uploadedImage: string | null;
  onImageUpload: (src: string) => void;
  onScan: () => void;
}

export default function ScanningView({ uploadedImage, onImageUpload, onScan }: ScanningViewProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [phrase, setPhrase] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Cycle AI phrases
  useEffect(() => {
    const iv = setInterval(() => setPhrase((p) => (p + 1) % AI_PHRASES.length), 2200);
    return () => clearInterval(iv);
  }, []);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageUpload(e.target?.result as string);
      setImageLoaded(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) handleFile(file);
  };

  const handleScanClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onScan();
    }, 2000);
  };

  const heroSrc = uploadedImage || '/assets/hero_outfit.png';

  return (
    <div className="animate-fadeIn px-4 pt-2">
      {/* ─── Scanner Container ─── */}
      <section
        className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-900 shadow-2xl cursor-pointer group"
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {/* Image */}
        <img
          src={heroSrc}
          alt="Outfit to analyze"
          className={`h-full w-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 h-7 w-7 rounded-tl-lg border-t-[3px] border-l-[3px] border-accent" />
        <div className="absolute top-4 right-4 h-7 w-7 rounded-tr-lg border-t-[3px] border-r-[3px] border-accent" />
        <div className="absolute bottom-4 left-4 h-7 w-7 rounded-bl-lg border-b-[3px] border-l-[3px] border-accent" />
        <div className="absolute bottom-4 right-4 h-7 w-7 rounded-br-lg border-b-[3px] border-r-[3px] border-accent" />

        {/* Laser Scan Line */}
        <div className="absolute left-5 right-5 h-0.5 bg-accent shadow-[0_0_12px_var(--color-accent),0_0_40px_var(--color-accent-glow)] animate-laser opacity-90">
          <div className="absolute inset-x-0 -top-[30px] h-[60px] bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
        </div>

        {/* Upload Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="grid h-14 w-14 place-items-center rounded-2xl border-2 border-dashed border-white/40 bg-white/15 group-hover:border-accent group-hover:bg-accent/20 transition-all duration-300">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <span className="text-sm font-medium text-white/80">Tap to upload or drag a photo</span>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 glass-dark flex items-center gap-2 rounded-full px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-dot" />
          <span className="text-[13px] font-medium text-white transition-opacity duration-150">
            {AI_PHRASES[phrase]}
          </span>
        </div>

        {/* Scanning loading overlay */}
        {isScanning && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-black/70 backdrop-blur-md animate-fadeIn">
            <div className="h-12 w-12 rounded-full border-4 border-white/20 border-t-accent animate-spin" />
            <span className="text-sm font-semibold text-white">Processing your style...</span>
          </div>
        )}

        <input
          ref={fileRef}
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = '';
          }}
        />
      </section>

      {/* ─── Scan Button ─── */}
      <button
        onClick={handleScanClick}
        disabled={isScanning}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-accent to-[#5AC8FA] px-6 py-4 text-base font-bold text-white shadow-lg shadow-accent-glow transition-all duration-300 hover:shadow-xl hover:shadow-accent-glow hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isScanning ? (
          <>
            <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Scanning...
          </>
        ) : (
          <>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Scan Outfit
          </>
        )}
      </button>

      {/* ─── Subtitle ─── */}
      <p className="mt-3 mb-2 text-center text-xs font-medium text-gray-400">
        Upload or snap a photo — AI detects your style in seconds
      </p>
    </div>
  );
}
