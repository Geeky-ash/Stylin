import { useState, useCallback, useRef } from 'react';
import TopNav from './components/TopNav';
import ScanningView from './components/ScanningView';
import ResultsView from './components/ResultsView';
import TabBar from './components/TabBar';
import Toast from './components/Toast';
import Walkthrough from './components/Walkthrough';
import { analyzeOutfit, type AnalysisStage, type ApiProduct } from './api';

export type AppView = 'scanning' | 'results';

const WALKTHROUGH_KEY = 'stylin_walkthrough_seen';

export default function App() {
  const [view, setView] = useState<AppView>('scanning');
  const [toast, setToast] = useState<string | null>(null);
  const [analysisStage, setAnalysisStage] = useState<AnalysisStage>('idle');
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showWalkthrough, setShowWalkthrough] = useState(
    () => !localStorage.getItem(WALKTHROUGH_KEY),
  );

  // Keep a ref to the selected file for the scan operation
  const selectedFileRef = useRef<File | null>(null);
  // Preview URL for the scanning view
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2600);
  }, []);

  /** Called when user picks a file from the camera/gallery */
  const handleImageSelect = useCallback((file: File, dataUrl: string) => {
    selectedFileRef.current = file;
    setPreviewUrl(dataUrl);
  }, []);

  /** Called when user taps "Scan Outfit" */
  const handleScan = useCallback(async () => {
    const file = selectedFileRef.current;

    if (!file) {
      // No custom image selected — switch to results with mock data
      setView('results');
      setAnalysisStage('complete');
      return;
    }

    // Clear previous results
    setApiProducts([]);
    setApiError(null);
    setView('results');

    try {
      const result = await analyzeOutfit(file, (stage) => {
        setAnalysisStage(stage);
      });

      setApiProducts(result.products);
      showToast(`Found ${result.products.length} matching products!`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Analysis failed';
      setApiError(message);
      setAnalysisStage('error');
      showToast(`Error: ${message}`);
    }
  }, [showToast]);

  const handleBack = useCallback(() => {
    setView('scanning');
    setAnalysisStage('idle');
    setApiProducts([]);
    setApiError(null);
  }, []);

  const handleWalkthroughComplete = useCallback(() => {
    localStorage.setItem(WALKTHROUGH_KEY, 'true');
    setShowWalkthrough(false);
  }, []);

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-white shadow-[0_0_80px_rgba(0,0,0,0.06)]">
      <TopNav onBack={view === 'results' ? handleBack : undefined} />

      <main className="flex-1 overflow-y-auto pb-24">
        {view === 'scanning' ? (
          <ScanningView
            previewUrl={previewUrl}
            onImageSelect={handleImageSelect}
            onScan={handleScan}
          />
        ) : (
          <ResultsView
            showToast={showToast}
            analysisStage={analysisStage}
            apiProducts={apiProducts}
            apiError={apiError}
            previewUrl={previewUrl}
          />
        )}
      </main>

      {/* Floating Camera FAB */}
      <button
        onClick={() => document.getElementById('fileInput')?.click()}
        className="fixed bottom-[100px] right-[calc(50%-215px+20px)] z-50 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#5AC8FA] shadow-lg shadow-accent-glow transition-all duration-300 hover:scale-110 hover:rotate-8 active:scale-92 max-[430px]:right-5"
        aria-label="Open Camera"
      >
        <span className="absolute inset-[-6px] rounded-full border-2 border-accent animate-fab-ripple opacity-0" />
        <svg className="h-6 w-6 fill-white" viewBox="0 0 24 24">
          <path d="M12 15.2A3.2 3.2 0 1 0 12 8.8a3.2 3.2 0 0 0 0 6.4z" />
          <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z" />
        </svg>
      </button>

      <TabBar />
      <Toast message={toast} />

      {/* First-launch walkthrough */}
      {showWalkthrough && <Walkthrough onComplete={handleWalkthroughComplete} />}
    </div>
  );
}
