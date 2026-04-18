import type { AnalysisStage } from '../api';

interface AnalysisProgressProps {
  stage: AnalysisStage;
  thumbnailUrl?: string | null;
}

interface TaskItem {
  id: string;
  label: string;
  activeAt: AnalysisStage[];
  doneAt: AnalysisStage[];
}

const TASKS: TaskItem[] = [
  {
    id: 'upload',
    label: 'Image Uploaded',
    activeAt: ['uploading'],
    doneAt: ['uploaded', 'identifying', 'matching', 'complete'],
  },
  {
    id: 'palette',
    label: 'Color Palette Extracted',
    activeAt: ['uploaded'],
    doneAt: ['identifying', 'matching', 'complete'],
  },
  {
    id: 'style',
    label: 'Style Identified',
    activeAt: ['identifying'],
    doneAt: ['matching', 'complete'],
  },
  {
    id: 'products',
    label: 'Finding Similar Products...',
    activeAt: ['matching'],
    doneAt: ['complete'],
  },
];

function getStatus(task: TaskItem, stage: AnalysisStage): 'pending' | 'active' | 'done' {
  if (task.doneAt.includes(stage)) return 'done';
  if (task.activeAt.includes(stage)) return 'active';
  return 'pending';
}

export default function AnalysisProgress({ stage, thumbnailUrl }: AnalysisProgressProps) {
  if (stage === 'idle') return null;

  const isProcessing = stage !== 'complete' && stage !== 'error';

  return (
    <section className="mx-4 mb-4 rounded-2xl glass-card p-4 animate-slideUp overflow-hidden relative">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-[#5AC8FA]">
            <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <h3 className="font-display text-sm font-bold text-gray-900 dark:text-gray-100">Analysis Progress</h3>
        </div>
        {stage === 'error' && (
          <span className="rounded-full bg-red-100 dark:bg-red-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-red-600 dark:text-red-400">
            Error
          </span>
        )}
        {stage === 'complete' && (
          <span className="rounded-full bg-green-100 dark:bg-green-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-green-600 dark:text-green-400">
            Done
          </span>
        )}
      </div>

      {/* Body Layout: Left is tasks, Right is Thumbnail */}
      <div className="flex gap-4">
        {/* Thumbnail Area */}
        {thumbnailUrl && (
          <div className="relative flex-shrink-0">
            <div className={`relative h-20 w-16 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 ${isProcessing ? 'animate-liquidRipple' : ''} z-10`}>
              <img
                src={thumbnailUrl}
                alt="Analyzing"
                className="h-full w-full object-cover transition-transform duration-[4000ms] ease-out scale-[1.05]"
              />
            </div>
            {/* Dark Mode glow backdrop for the liquid ripple */}
            {isProcessing && (
              <div className="absolute inset-0 bg-accent/30 dark:bg-accent/50 blur-xl animate-pulse rounded-xl" />
            )}
          </div>
        )}

        {/* Task List */}
        <div className="flex flex-col justify-center space-y-3 flex-1">
          {TASKS.map((task, i) => {
            const status = getStatus(task, stage);
            return (
              <div
                key={task.id}
                className="flex items-center gap-3 animate-cardUp"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Status Icon */}
                {status === 'done' ? (
                  <div className="grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-green-500 dark:bg-accent animate-checkPop">
                    <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                ) : status === 'active' ? (
                  <div className="grid h-5 w-5 flex-shrink-0 place-items-center">
                    <div className="h-4 w-4 rounded-full border-[2px] border-gray-200 dark:border-gray-700 border-t-accent dark:border-t-accent animate-spin" />
                  </div>
                ) : (
                  <div className="grid h-5 w-5 flex-shrink-0 place-items-center">
                    <div className="h-4 w-4 rounded-full border-[2px] border-gray-200 dark:border-gray-700" />
                  </div>
                )}

                {/* Label */}
                <span
                  className={`text-xs font-medium transition-colors duration-300 ${
                    status === 'done'
                      ? 'text-gray-900 dark:text-gray-100'
                      : status === 'active'
                        ? 'text-accent dark:text-accent font-bold'
                        : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  {task.label}
                  {task.id === 'style' && status === 'done' && (
                    <span className="ml-1 text-accent dark:text-[#5AC8FA] opacity-90">(Streetwear)</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
