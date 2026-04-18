import { useState } from 'react';

const TABS = [
  {
    id: 'discover',
    label: 'Discover',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    id: 'wardrobe',
    label: 'Wardrobe',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20.38 3.46L16 2 12 5.5 8 2 3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10h12V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    id: 'trending',
    label: 'Trending',
    icon: (
      <svg viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
] as const;

export default function TabBar() {
  const [activeTab, setActiveTab] = useState('discover');

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[430px] -translate-x-1/2 justify-around border-t border-gray-200 dark:border-white/10 glass pb-[env(safe-area-inset-bottom,8px)] pt-2">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex flex-col items-center gap-1 px-4 py-1.5 rounded-lg transition-colors duration-150"
          >
            {/* Active indicator line */}
            {isActive && (
              <span className="absolute -top-2 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-accent" />
            )}
            <span
              className={`[&>svg]:h-[22px] [&>svg]:w-[22px] [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:stroke-[1.8] transition-colors duration-150 ${
                isActive ? 'text-accent [&>svg]:stroke-[2.2]' : 'text-gray-400'
              }`}
            >
              {tab.icon}
            </span>
            <span
              className={`text-[10px] font-semibold transition-colors duration-150 ${
                isActive ? 'text-accent' : 'text-gray-400'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
