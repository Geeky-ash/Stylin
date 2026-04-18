import { useState, useEffect, useRef } from 'react';

interface TopNavProps {
  onBack?: () => void;
}

export default function TopNav({ onBack }: TopNavProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Initialize theme
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between glass px-5 py-3 border-b border-gray-200/50 dark:border-white/10 transition-colors duration-500">
      <div className="flex items-center gap-2.5">
        {onBack ? (
          <button
            onClick={onBack}
            className="mr-1 flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-gray-800/80 transition-all duration-150 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
            aria-label="Go back"
          >
            <svg className="h-5 w-5 text-gray-700 dark:text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        ) : null}
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-[#5AC8FA] shadow-lg shadow-accent-glow">
          <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="font-display text-[22px] font-bold tracking-tight bg-gradient-to-r from-accent to-[#5AC8FA] bg-clip-text text-transparent">
          Stylin'
        </h1>
      </div>
      <div className="flex gap-2 relative" ref={settingsRef}>
        {/* Settings Toggle */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="relative grid h-10 w-10 place-items-center rounded-xl bg-gray-100/80 dark:bg-gray-800/80 transition-all duration-150 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
          aria-label="Settings"
        >
          <svg className="h-5 w-5 text-gray-700 dark:text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
        
        {/* Dropdown Menu */}
        {showSettings && (
          <div className="absolute top-12 right-0 w-48 glass-card rounded-2xl p-2 shadow-xl animate-fadeIn origin-top-right">
            <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Dark Mode</span>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDark ? 'bg-accent' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span className="sr-only">Toggle dark mode</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDark ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        <button className="relative grid h-10 w-10 place-items-center rounded-xl bg-gray-100/80 dark:bg-gray-800/80 transition-all duration-150 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105" aria-label="Notifications">
          <svg className="h-5 w-5 text-gray-700 dark:text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900" />
        </button>
      </div>
    </nav>
  );
}
