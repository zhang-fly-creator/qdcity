import type { LoadStatus } from '../lib/modelLoader';

interface Props {
  progress: number;
  status: LoadStatus;
  modelName: string;
  error?: unknown;
}

const STATUS_TEXT: Record<LoadStatus, string> = {
  idle: '正在加载青岛老建筑 3D 模型',
  downloading: '正在解析城市记忆',
  parsing: '模型文件较大，请稍候',
  done: '建筑已入展',
  error: '模型加载失败',
};

export function ProgressOverlay({ progress, status, modelName, error }: Props) {
  const percent = Math.round(progress * 100);
  return (
    <div className="progress-overlay" role="status" aria-live="polite">
      <div className="progress-card">
        <div className="progress-spinner" aria-hidden="true">
          <CellRing />
        </div>
        <div className="progress-headline">
          正在加载 <strong>{modelName}</strong>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${Math.max(2, percent)}%` }}
          />
        </div>
        <div className="progress-status">
          <span className="progress-percent">{percent}%</span>
          <span className="progress-text">{STATUS_TEXT[status]}</span>
        </div>
        {status === 'error' && (
          <div className="progress-error">
            {(error as Error | undefined)?.message ?? '请刷新页面，再次进入这段城市记忆。'}
          </div>
        )}
      </div>
    </div>
  );
}

function CellRing() {
  return (
    <svg viewBox="0 0 80 80" width="80" height="80">
      <defs>
        <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d7b46a" />
          <stop offset="55%" stopColor="#2f7f8f" />
          <stop offset="100%" stopColor="#8f3f2f" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="32" stroke="rgba(0,0,0,0.06)" strokeWidth="6" fill="none" />
      <circle
        cx="40"
        cy="40"
        r="32"
        stroke="url(#ring)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="200"
        strokeDashoffset="60"
        transform="rotate(-90 40 40)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="-90 40 40"
          to="270 40 40"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </circle>
      <rect x="31" y="34" width="18" height="18" rx="2" fill="#5f4a3d" opacity="0.75" />
      <path d="M29 35l11-8 11 8" fill="#b85f4d" />
      <circle cx="40" cy="42" r="3" fill="#f0d58a" />
    </svg>
  );
}
