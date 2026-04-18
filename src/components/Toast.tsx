interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div
      className={`fixed bottom-[90px] left-1/2 z-[1000] flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-2xl whitespace-nowrap transition-all duration-300 ${
        message
          ? 'translate-y-0 opacity-100'
          : 'translate-y-[100px] opacity-0'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
    >
      <svg className="h-5 w-5 fill-green-400 flex-shrink-0" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      {message}
    </div>
  );
}

