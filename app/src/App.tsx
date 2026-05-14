import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_MODEL_ID, MODELS } from './data/models';
import { Sidebar } from './components/Sidebar';
import { ModelViewer } from './components/ModelViewer';
import { InfoPanel } from './components/InfoPanel';
import { ArchiveTimeline } from './components/ArchiveTimeline';
import { TimeMapHome } from './components/TimeMapHome';
import { PanoramaModelPage } from './components/PanoramaModelPage';
import { BuildingModelMapPage } from './components/BuildingModelMapPage';
import { getLoadEntry, loadModel, preloadModel } from './lib/modelLoader';
import './app.css';

type ViewMode = 'peopleMap' | 'modelMap' | 'gallery' | 'panorama';

function App() {
  const [activeId, setActiveId] = useState<string>(DEFAULT_MODEL_ID);
  const [viewMode, setViewMode] = useState<ViewMode>('panorama');
  const activeModel = useMemo(
    () => MODELS.find((m) => m.id === activeId) ?? MODELS[0],
    [activeId]
  );

  useEffect(() => {
    let cancelled = false;

    const firstEntry = loadModel(activeModel.modelUrl, {
      fileSize: activeModel.fileSize,
    });

    let started = false;
    const queueOthers = () => {
      if (cancelled || started) return;
      started = true;
      const queue = MODELS.filter((m) => m.id !== activeModel.id);
      let i = 0;
      const next = () => {
        if (cancelled || i >= queue.length) return;
        const m = queue[i++];
        preloadModel(m.modelUrl, { fileSize: m.fileSize });
        const entry = getLoadEntry(m.modelUrl);
        entry?.promise.finally(() => {
          if (cancelled) return;
          setTimeout(next, 120);
        });
      };
      next();
    };

    const timer = setTimeout(queueOthers, 5000);
    firstEntry.promise
      .then(() => {
        clearTimeout(timer);
        queueOthers();
      })
      .catch(() => {
        clearTimeout(timer);
        queueOthers();
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // Only run once on mount; switching buildings should not restart the preload queue.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enterBuilding = (id: string) => {
    setActiveId(id);
    setViewMode('gallery');
  };

  const moveBuilding = (direction: -1 | 1) => {
    const currentIndex = MODELS.findIndex((m) => m.id === activeId);
    const nextIndex = (currentIndex + direction + MODELS.length) % MODELS.length;
    setActiveId(MODELS[nextIndex].id);
  };

  if (viewMode === 'peopleMap') {
    return (
      <TimeMapHome
        models={MODELS}
        activeId={activeId}
        onEnterBuilding={enterBuilding}
        onEnterPanorama={() => setViewMode('panorama')}
        onEnterModelMap={() => setViewMode('modelMap')}
      />
    );
  }

  if (viewMode === 'panorama') {
    return (
      <PanoramaModelPage
        models={MODELS}
        onEnterPeopleMap={() => setViewMode('peopleMap')}
        onEnterModelMap={() => setViewMode('modelMap')}
        onEnterGallery={() => {
          setActiveId(MODELS[0].id);
          setViewMode('gallery');
        }}
        onEnterBuilding={enterBuilding}
      />
    );
  }

  if (viewMode === 'modelMap') {
    return (
      <BuildingModelMapPage
        models={MODELS}
        activeId={activeId}
        onEnterBuilding={enterBuilding}
        onEnterPanorama={() => setViewMode('panorama')}
        onEnterPeopleMap={() => setViewMode('peopleMap')}
      />
    );
  }

  return (
    <div className="app-shell">
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
            className="back-map-btn"
            onClick={() => setViewMode('panorama')}
          >
            青岛全景模型
          </button>
          <button
            type="button"
            className="back-map-btn"
            onClick={() => setViewMode('peopleMap')}
          >
            人物地图
          </button>
          <button
            type="button"
            className="back-map-btn"
            onClick={() => setViewMode('modelMap')}
          >
            建筑模型地图
          </button>
          <button
            type="button"
            className="back-map-btn"
            onClick={() => setViewMode('gallery')}
          >
            3D 建筑展厅
          </button>
          <span className="meta-pill">演示版 v1.0</span>
          <span className="meta-text">支持 3D 旋转 · AI 伴游 · 中文 / English</span>
        </div>
      </header>

      <main className="layout">
        <Sidebar models={MODELS} activeId={activeId} onSelect={setActiveId} />

        <section className="stage-stack">
          <section
            className="stage"
            style={{ '--accent': activeModel.accent } as React.CSSProperties}
          >
            <div className="gallery-switcher" aria-label="切换建筑">
              <button type="button" onClick={() => moveBuilding(-1)}>
                上一栋
              </button>
              <span>{MODELS.findIndex((m) => m.id === activeModel.id) + 1} / {MODELS.length}</span>
              <button type="button" onClick={() => moveBuilding(1)}>
                下一栋
              </button>
            </div>
            <ModelViewer key={activeModel.id} model={activeModel} />
          </section>

          <ArchiveTimeline model={activeModel} />
        </section>

        <InfoPanel model={activeModel} />
      </main>

      <footer className="footer">
        <span>
          © 2026 青岛老建筑时光伴游 · 用 3D 模型、历史人物与 AI
          讲解重访城市记忆
        </span>
      </footer>
    </div>
  );
}

export default App;
