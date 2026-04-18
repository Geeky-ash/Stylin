interface TopNavProps {
  onBack?: () => void;
}

export default function TopNav({ onBack }: TopNavProps) {
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between bg-white px-5 py-3">
      <div className="flex items-center gap-2.5">
        {onBack ? (
          <button
            onClick={onBack}
            className="mr-1 flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 transition-all duration-150 hover:bg-gray-200 hover:scale-105"
            aria-label="Go back"
          >
            <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <div className="flex gap-2">
        <button className="relative grid h-10 w-10 place-items-center rounded-xl bg-gray-100 transition-all duration-150 hover:bg-gray-200 hover:scale-105" aria-label="Search">
          <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button className="relative grid h-10 w-10 place-items-center rounded-xl bg-gray-100 transition-all duration-150 hover:bg-gray-200 hover:scale-105" aria-label="Notifications">
          <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
      </div>
    </nav>
  );
}
