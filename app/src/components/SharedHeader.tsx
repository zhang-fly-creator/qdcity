type ViewMode = 'panorama' | 'peopleMap' | 'gallery';

interface Props {
  activeView: ViewMode;
  onEnterPanorama: () => void;
  onEnterPeopleMap: () => void;
  onEnterGallery: () => void;
}

export function SharedHeader({
  activeView,
  onEnterPanorama,
  onEnterPeopleMap,
  onEnterGallery,
}: Props) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="36" height="36">
            <defs>
              <linearGradient id="bm" x1="10%" y1="10%" x2="90%" y2="90%">
                <stop offset="0%" stopColor="#d7b46a" />
                <stop offset="48%" stopColor="#2f7f8f" />
                <stop offset="100%" stopColor="#8f3f2f" />
              </linearGradient>
            </defs>
            <rect x="8" y="17" width="32" height="22" rx="3" fill="url(#bm)" />
            <path d="M6 18L24 7l18 11" fill="#b85f4d" />
            <path d="M14 39V24h6v15M28 39V24h6v15" stroke="#fff8e8" strokeWidth="2.2" />
            <path d="M10 19h28" stroke="#fff8e8" strokeWidth="1.8" opacity="0.75" />
            <circle cx="24" cy="15" r="2.4" fill="#f0d58a" />
          </svg>
        </div>
        <div>
          <h1 className="brand-title">青岛老建筑时光伴游</h1>
          <p className="brand-tagline">
            <span className="brand-pen">在红瓦绿树之间，打开一座城市的百年记忆</span>
            <span className="brand-sep">·</span>
            <span>Qingdao Heritage Time Guide</span>
          </p>
        </div>
      </div>
      <div className="topbar-meta">
        <button
          type="button"
          className={`back-map-btn${activeView === 'panorama' ? ' active-nav' : ''}`}
          onClick={onEnterPanorama}
        >
          青岛全景模型
        </button>
        <button
          type="button"
          className={`back-map-btn${activeView === 'peopleMap' ? ' active-nav' : ''}`}
          onClick={onEnterPeopleMap}
        >
          人物地图
        </button>
        <button
          type="button"
          className={`back-map-btn${activeView === 'gallery' ? ' active-nav' : ''}`}
          onClick={onEnterGallery}
        >
          3D 建筑展厅
        </button>
        <span className="meta-pill">演示版 v1.0</span>
        <span className="meta-text">支持 3D 旋转 · AI 伴游 · 中文 / English</span>
      </div>
    </header>
  );
}
