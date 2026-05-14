import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_MODEL_ID, MODELS } from './data/models';
import { Sidebar } from './components/Sidebar';
import { ModelViewer } from './components/ModelViewer';
import { InfoPanel } from './components/InfoPanel';
import { ArchiveTimeline } from './components/ArchiveTimeline';
import { TimeMapHome } from './components/TimeMapHome';
import { PanoramaModelPage } from './components/PanoramaModelPage';
import { SharedHeader } from './components/SharedHeader';
import { getLoadEntry, loadModel, preloadModel } from './lib/modelLoader';
import './app.css';

type ViewMode = 'peopleMap' | 'gallery' | 'panorama';

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
      />
    );
  }

  if (viewMode === 'panorama') {
    return (
      <PanoramaModelPage
        models={MODELS}
        onEnterPeopleMap={() => setViewMode('peopleMap')}
        onEnterGallery={() => {
          setActiveId(MODELS[0].id);
          setViewMode('gallery');
        }}
        onEnterBuilding={enterBuilding}
      />
    );
  }

  return (
    <div className="app-shell">
      <SharedHeader
        activeView="gallery"
        onEnterPanorama={() => setViewMode('panorama')}
        onEnterPeopleMap={() => setViewMode('peopleMap')}
        onEnterGallery={() => setViewMode('gallery')}
      />

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
