import type { AnalysisStage } from '../api';

interface AnalysisProgressProps {
  stage: AnalysisStage;
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

export default function AnalysisProgress({ stage }: AnalysisProgressProps) {
  if (stage === 'idle') return null;

  return (
    <section className="mx-4 mb-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-md animate-slideUp">
      <div className="mb-3 flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-[#5AC8FA]">
          <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <h3 className="font-display text-sm font-bold text-gray-900">Analysis Progress</h3>
        {stage === 'error' && (
          <span className="ml-auto rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-semibold text-red-600">
            Error
          </span>
        )}
        {stage === 'complete' && (
          <span className="ml-auto rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-semibold text-green-600">
            Done
          </span>
        )}
      </div>

      <div className="space-y-2.5">
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
                <div className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-green-500 animate-checkPop">
                  <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              ) : status === 'active' ? (
                <div className="grid h-6 w-6 flex-shrink-0 place-items-center">
                  <div className="h-5 w-5 rounded-full border-2 border-gray-200 border-t-accent animate-spin" />
                </div>
              ) : (
                <div className="grid h-6 w-6 flex-shrink-0 place-items-center">
                  <div className="h-4 w-4 rounded-full border-2 border-gray-200" />
                </div>
              )}

              {/* Label */}
              <span
                className={`text-[13px] font-medium transition-colors duration-300 ${
                  status === 'done'
                    ? 'text-gray-900'
                    : status === 'active'
                      ? 'text-accent font-semibold'
                      : 'text-gray-400'
                }`}
              >
                {task.label}
                {task.id === 'style' && status === 'done' && (
                  <span className="ml-1 text-accent">(Streetwear)</span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
