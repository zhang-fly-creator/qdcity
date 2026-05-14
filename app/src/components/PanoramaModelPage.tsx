import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import type { CellModel } from '../data/models';
import { getHeritageContent } from '../data/heritageContent';
import { useModel } from '../hooks/useModel';
import { ModelScene } from './ModelScene';
import { PanoramaDriveController } from './PanoramaDriveController';
import { PanoramaMarker } from './PanoramaMarker';
import { ProgressOverlay } from './ProgressOverlay';
import { PANORAMA_MARKERS } from '../data/panoramaMarkers';
import { SharedHeader } from './SharedHeader';

interface Props {
  models: CellModel[];
  onEnterPeopleMap: () => void;
  onEnterGallery: () => void;
  onEnterBuilding: (id: string) => void;
}

const BASE = import.meta.env.BASE_URL;
const PANORAMA_MODEL_URL = `${BASE}models/qingdao/scene.glb`.replace(/\/+/g, '/');
const PANORAMA_FILE_SIZE = 6441936;

export function PanoramaModelPage({
  models,
  onEnterPeopleMap,
  onEnterGallery,
  onEnterBuilding,
}: Props) {
  const { status, progress, entry } = useModel(PANORAMA_MODEL_URL, {
    autoStart: true,
    fileSize: PANORAMA_FILE_SIZE,
  });
  const [autoRotate, setAutoRotate] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);
  const [driveMode, setDriveMode] = useState(false);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const isReady = status === 'done' && !!entry?.gltf;

  const activeMarker = useMemo(
    () => PANORAMA_MARKERS.find((marker) => marker.buildingId === hoveredMarkerId) ?? PANORAMA_MARKERS[0],
    [hoveredMarkerId]
  );
  const activeModel = useMemo(
    () => models.find((model) => model.id === activeMarker.modelId) ?? models[0],
    [activeMarker.modelId, models]
  );
  const activeEncounter = getHeritageContent(activeModel.id)?.encounterCharacter;

  useEffect(() => {
    if (!driveMode || !cameraRef.current) return;
    const camera = cameraRef.current;
    camera.position.set(-1.42, 0.045, 0.18);
    camera.rotation.set(-0.01, 0.68, 0);
    const controls = controlsRef.current;
    controls?.target.set(-1.05, 0.04, -0.08);
    controls?.update();
  }, [driveMode]);

  const handleReset = () => {
    setDriveMode(false);
    const controls = controlsRef.current;
    if (!controls) return;
    controls.target.set(0, 0, 0);
    controls.object.position.set(0, 1.2, 3.6);
    controls.object.rotation.set(-0.28, 0, 0);
    controls.update();
  };

  const handleEnterBuilding = (modelId: string) => {
    setDriveMode(false);
    onEnterBuilding(modelId);
  };

  return (
    <div className="panorama-shell">
      <SharedHeader
        activeView="panorama"
        onEnterPanorama={() => undefined}
        onEnterPeopleMap={onEnterPeopleMap}
        onEnterGallery={onEnterGallery}
      />

      <section className="page-intro-bar panorama-intro-bar">
        <div>
          <h2 className="page-title">青岛全景模型</h2>
          <p className="page-subtitle">以 3D 城市模型俯瞰青岛老城空间、道路肌理与重点建筑分布</p>
          <p className="page-copy">
            这里是青岛老建筑时光伴游的城市入口。你可以在全景模型中查看老城空间，悬停建筑标注了解故事，切换到人物地图寻找文化名人，也可以进入单栋建筑 3D 展厅继续探索。
          </p>
        </div>
        <div className="page-tools">
          <button
            type="button"
            className="back-map-btn"
            onClick={() => setShowMarkers((value) => !value)}
          >
            {showMarkers ? '隐藏标注' : '显示标注'}
          </button>
          <button
            type="button"
            className={`tool-btn${driveMode ? ' active' : ''}`}
            onClick={() => setDriveMode((value) => !value)}
          >
            {driveMode ? '退出驾驶' : '驾驶浏览'}
          </button>
          <button
            type="button"
            className={`tool-btn${autoRotate ? ' active' : ''}`}
            onClick={() => setAutoRotate((value) => !value)}
          >
            {autoRotate ? '暂停旋转' : '自动旋转'}
          </button>
          <button type="button" className="tool-btn" onClick={handleReset}>
            复位视角
          </button>
        </div>
      </section>

      <main className="panorama-layout">
        <section className="panorama-stage">
          <div className="panorama-grid" aria-hidden="true" />
          <Canvas
            shadows="percentage"
            dpr={[1, 2]}
            camera={{ position: [0, 1.2, 3.6], fov: 42 }}
            gl={{ antialias: true, preserveDrawingBuffer: true }}
            onCreated={({ camera }) => {
              cameraRef.current = camera as THREE.PerspectiveCamera;
            }}
          >
            <ambientLight intensity={0.65} />
            <directionalLight position={[7, 8, 5]} intensity={1.05} castShadow />
            <directionalLight position={[-5, 3, -4]} intensity={0.28} />

            <Suspense fallback={null}>
              <Environment preset="city" environmentIntensity={0.52} />
            </Suspense>

            {isReady && entry?.gltf ? (
              <ModelScene
                gltf={entry.gltf}
                autoRotate={false}
                initialRotationY={-Math.PI / 9}
                displayScale={3.3}
              />
            ) : null}

            {PANORAMA_MARKERS.map((marker) => (
              <PanoramaMarker
                key={marker.buildingId}
                marker={marker}
                visible={showMarkers}
                active={hoveredMarkerId === marker.buildingId}
                onHoverStart={() => setHoveredMarkerId(marker.buildingId)}
                onHoverEnd={() => setHoveredMarkerId((value) => (value === marker.buildingId ? null : value))}
                onClick={() => handleEnterBuilding(marker.modelId)}
              />
            ))}

            <PanoramaDriveController
              enabled={driveMode}
              cameraRef={cameraRef}
              onExit={() => setDriveMode(false)}
            />

            <ContactShadows
              position={[0, -1.35, 0]}
              opacity={0.24}
              scale={8}
              blur={2.8}
              far={4.8}
            />

            <OrbitControls
              ref={controlsRef}
              makeDefault
              enableDamping
              dampingFactor={0.08}
              minDistance={1.8}
              maxDistance={12}
              autoRotate={autoRotate && !driveMode}
              enabled={!driveMode}
            />
          </Canvas>

          <div className="panorama-overlay">
            <span className="overlay-status-pill">城市全景 GLB</span>
            <p>拖拽旋转 · 滚轮缩放 · 右键平移 · 城市沙盘视角</p>
          </div>

          {driveMode ? (
            <div className="drive-hud">
              <strong>驾驶浏览中</strong>
              <span>W / ↑ 前进</span>
              <span>S / ↓ 后退</span>
              <span>A 左移</span>
              <span>D 右移</span>
              <span>← / Q 左转</span>
              <span>→ / E 右转</span>
              <span>Shift 加速</span>
              <span>Esc 退出</span>
            </div>
          ) : null}

          {!isReady ? (
            <ProgressOverlay
              progress={progress}
              status={status}
              modelName="青岛全景模型"
              error={entry?.error}
            />
          ) : null}
        </section>

        <aside className="panorama-info">
          <section className="info-card panorama-list-card">
            <span className="card-eyebrow">重点建筑</span>
            <div className="panorama-building-list">
              {PANORAMA_MARKERS.map((marker) => (
                <button
                  type="button"
                  key={marker.buildingId}
                  className={`panorama-building-item${hoveredMarkerId === marker.buildingId ? ' active' : ''}`}
                  onMouseEnter={() => setHoveredMarkerId(marker.buildingId)}
                  onFocus={() => setHoveredMarkerId(marker.buildingId)}
                  onClick={() => handleEnterBuilding(marker.modelId)}
                >
                  <span>{String(marker.index).padStart(2, '0')}</span>
                  <div>
                    <strong>{marker.label}</strong>
                    <small>{marker.category}</small>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="info-card panorama-note-card">
            <span className="card-eyebrow">城市空间说明</span>
            <p>{activeMarker.shortDescription}</p>
            <div className="panorama-current-meta">
              <strong>{activeMarker.label}</strong>
              <em>{activeMarker.category}</em>
              <small>可偶遇：{activeEncounter?.name ?? '历史讲述人'}</small>
            </div>
            <dl className="panorama-facts">
              <div>
                <dt>模型类型</dt>
                <dd>城市全景 GLB</dd>
              </div>
              <div>
                <dt>查看方式</dt>
                <dd>拖拽旋转 / 滚轮缩放 / 右键平移</dd>
              </div>
              <div>
                <dt>后续扩展</dt>
                <dd>重点建筑高亮、路线叠加、点位标注、实地打卡联动</dd>
              </div>
            </dl>
          </section>

        </aside>
      </main>
    </div>
  );
}
