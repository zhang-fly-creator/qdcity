import { useMemo, useState } from 'react';
import type { CellModel } from '../data/models';
import { BuildingImage } from './BuildingImage';
import { getHeritageContent } from '../data/heritageContent';

interface Props {
  models: CellModel[];
  activeId: string;
  onEnterBuilding: (id: string) => void;
  onEnterPanorama: () => void;
  onEnterPeopleMap: () => void;
}

const BUILDING_MAP_POINTS = [
  { left: 22, top: 54 },
  { left: 34, top: 42 },
  { left: 40, top: 35 },
  { left: 54, top: 38 },
  { left: 63, top: 56 },
  { left: 58, top: 46 },
  { left: 74, top: 30 },
  { left: 28, top: 63 },
  { left: 24, top: 46 },
  { left: 78, top: 60 },
];

export function BuildingModelMapPage({
  models,
  activeId,
  onEnterBuilding,
  onEnterPanorama,
  onEnterPeopleMap,
}: Props) {
  const [highlightedId, setHighlightedId] = useState(activeId);
  const highlightedModel = useMemo(
    () => models.find((model) => model.id === highlightedId) ?? models[0],
    [highlightedId, models]
  );

  return (
    <div className="time-map-shell building-map-shell">
      <header className="time-map-topbar">
        <div className="time-map-brand">
          <div className="time-map-logo" aria-hidden="true">
            <span className="logo-roof" />
            <span className="logo-wave" />
          </div>
          <div>
            <h1>青岛建筑模型地图</h1>
            <p>从建筑点位进入 3D 展厅，查看青岛老建筑模型、故事和实地打卡任务</p>
            <p className="time-map-intro">
              这里适合从建筑入口理解青岛老城。你可以查看重点建筑点位，悬停了解故事，也可以继续进入单栋建筑 3D 展厅。
            </p>
          </div>
        </div>
        <div className="time-map-tags" aria-label="项目标签">
          <button type="button" className="tag-button" onClick={onEnterPanorama}>
            返回青岛全景模型
          </button>
          <button type="button" className="tag-button" onClick={onEnterPeopleMap}>
            人物地图
          </button>
          <span>建筑模型地图</span>
          <button type="button" className="tag-button" onClick={() => onEnterBuilding(highlightedModel.id)}>
            3D 建筑展厅
          </button>
        </div>
      </header>

      <main className="building-map-layout">
        <section className="map-card building-map-stage-card">
          <div className="map-card-head">
            <span className="map-dot" />
            <h2>青岛建筑模型地图</h2>
          </div>
          <div className="building-illustration-map" aria-label="青岛建筑模型地图">
            <div className="sea-region">
              <span>海岸方向</span>
            </div>
            <div className="hill-region">
              <span>信号山</span>
            </div>
            <div className="old-town-region" />
            <div className="main-road road-a" />
            <div className="main-road road-b" />
            <div className="main-road road-c" />
            {models.map((model, index) => {
              const point = BUILDING_MAP_POINTS[index % BUILDING_MAP_POINTS.length];
              return (
                <button
                  type="button"
                  key={model.id}
                  className={`building-map-point${model.id === highlightedModel.id ? ' active' : ''}`}
                  style={
                    {
                      '--x': `${point.left}%`,
                      '--y': `${point.top}%`,
                      '--accent': model.accent,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => setHighlightedId(model.id)}
                  onFocus={() => setHighlightedId(model.id)}
                  onClick={() => onEnterBuilding(model.id)}
                >
                  <span>{index + 1}</span>
                  <div className="building-map-tooltip">
                    <strong>{model.name}</strong>
                    <em>{model.category}</em>
                    <small>可偶遇：{getHeritageContent(model.id)?.encounterCharacter.name ?? '历史讲述人'}</small>
                    <p>{model.description.split('。')[0]}。</p>
                    <b>进入 3D 展厅</b>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="map-hint">点击建筑点位，进入 3D 建筑展厅，继续查看故事与打卡任务。</p>
        </section>

        <aside className="building-map-side">
          <section className="map-card current-building-card">
            <div className="map-card-head">
              <span className="map-dot" />
              <h2>当前建筑</h2>
            </div>
            <div className="current-building-body">
              <div className="current-building-thumb">
                <BuildingImage model={highlightedModel} />
              </div>
              <div className="current-building-copy">
                <strong>{highlightedModel.name}</strong>
                <em>{highlightedModel.category}</em>
                <small>{highlightedModel.location}</small>
                <p>{highlightedModel.description}</p>
                <button type="button" className="current-person-action" onClick={() => onEnterBuilding(highlightedModel.id)}>
                  进入 3D 建筑展厅
                </button>
              </div>
            </div>
          </section>

          <section className="map-card building-directory-card">
            <div className="map-card-head">
              <span className="map-dot" />
              <h2>重点建筑目录</h2>
            </div>
            <div className="building-directory-list">
              {models.map((model, index) => {
                const encounterName =
                  getHeritageContent(model.id)?.encounterCharacter.name ?? '历史讲述人';
                return (
                  <button
                    type="button"
                    key={model.id}
                    className={`directory-item${model.id === highlightedModel.id ? ' active' : ''}`}
                    onMouseEnter={() => setHighlightedId(model.id)}
                    onFocus={() => setHighlightedId(model.id)}
                    onClick={() => onEnterBuilding(model.id)}
                    style={{ '--accent': model.accent } as React.CSSProperties}
                  >
                    <span className="directory-index">{String(index + 1).padStart(2, '0')}</span>
                    <BuildingImage model={model} compact />
                    <span className="directory-copy">
                      <strong>{model.name}</strong>
                      <em>{model.category}</em>
                      <span>{encounterName}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </aside>
      </main>

      <footer className="time-map-footer">
        © 2026 青岛建筑模型地图 · 用建筑点位、3D 展厅与人物故事串联青岛老城记忆
      </footer>
    </div>
  );
}
