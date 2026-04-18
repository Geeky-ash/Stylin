import { useState } from 'react';

interface WalkthroughProps {
  onComplete: () => void;
}

const STEPS = [
  {
    icon: (
      <svg className="h-16 w-16 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    title: 'Snap a Photo',
    description: 'Upload or snap a photo of any outfit you love — from your wardrobe, street style, or social media.',
  },
  {
    icon: (
      <svg className="h-16 w-16 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'AI Identifies the Vibe',
    description: 'Our AI analyzes colors, silhouettes, and patterns to detect your style — like Streetwear, Minimalist, or Earth Tones.',
  },
  {
    icon: (
      <svg className="h-16 w-16 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    title: 'Shop the Look',
    description: 'Get curated product picks from real stores that match your vibe. Add to cart in one tap.',
  },
];

export default function Walkthrough({ onComplete }: WalkthroughProps) {
  const [step, setStep] = useState(0);

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="mx-6 w-full max-w-[380px] rounded-3xl bg-white p-8 shadow-2xl">
        {/* Step indicator */}
        <div className="mb-2 text-center text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          Step {step + 1} of {STEPS.length}
        </div>

        {/* Icon area */}
        <div className="mx-auto mb-6 grid h-28 w-28 place-items-center rounded-3xl bg-accent/5">
          <div className="animate-fadeIn" key={step}>
            {current.icon}
          </div>
        </div>

        {/* Content */}
        <div className="text-center animate-fadeIn" key={`text-${step}`}>
          <h2 className="mb-2 font-display text-xl font-bold text-gray-900">
            {current.title}
          </h2>
          <p className="text-sm leading-relaxed text-gray-500">
            {current.description}
          </p>
        </div>

        {/* Pagination dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step
                  ? 'w-6 bg-accent'
                  : 'w-2 bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={onComplete}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-400 transition-colors hover:text-gray-600"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-[#5AC8FA] px-7 py-2.5 text-sm font-bold text-white shadow-lg shadow-accent-glow transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            {isLast ? 'Get Started' : 'Next'}
            {!isLast && (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
