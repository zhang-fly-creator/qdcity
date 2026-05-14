import { useMemo, useState } from 'react';
import type { CellModel } from '../data/models';
import { QINGDAO_PEOPLE, type QingdaoPerson } from '../data/qingdaoPeople';
import { SharedHeader } from './SharedHeader';

interface Props {
  models: CellModel[];
  activeId: string;
  onEnterBuilding: (id: string) => void;
  onEnterPanorama: () => void;
}

const AVATAR_GLYPHS: Record<QingdaoPerson['avatarType'], string> = {
  writer: '📖',
  thinker: '📜',
  poet: '✒️',
  drama: '🎭',
  scholar: '🎓',
  artist: '🖋️',
};

export function TimeMapHome({ models, activeId, onEnterBuilding, onEnterPanorama }: Props) {
  const [selectedPersonId, setSelectedPersonId] = useState('laoshe');
  const [hoveredPersonId, setHoveredPersonId] = useState<string | null>(null);

  const currentPerson = useMemo(
    () => QINGDAO_PEOPLE.find((person) => person.id === selectedPersonId) ?? QINGDAO_PEOPLE[0],
    [selectedPersonId]
  );

  const relatedBuilding = useMemo(
    () =>
      currentPerson.relatedBuildingId
        ? models.find((model) => model.id === currentPerson.relatedBuildingId)
        : undefined,
    [currentPerson.relatedBuildingId, models]
  );

  return (
    <div className="time-map-shell people-map-shell">
      <SharedHeader
        activeView="peopleMap"
        onEnterPanorama={onEnterPanorama}
        onEnterPeopleMap={() => undefined}
        onEnterGallery={() => onEnterBuilding(activeId)}
      />

      <section className="page-intro-bar people-intro-bar">
        <div>
          <h2 className="page-title">青岛名人人物地图</h2>
          <p className="page-subtitle">在红瓦绿树之间，遇见曾经停留在青岛的文化名人</p>
          <p className="page-copy">
            青岛不仅有老建筑，也有一批在这里生活、写作、任教、旅居或留下足迹的文化人物。点击人物头像，查看他与青岛的关系，也可以继续进入相关建筑与 3D 展厅。
          </p>
        </div>
      </section>

      <main className="people-home-layout">
        <section className="map-card people-map-card">
          <div className="map-card-head">
            <span className="map-dot" />
            <h2>青岛人物足迹地图</h2>
          </div>

          <div className="people-illustration-map" aria-label="青岛文化人物足迹地图">
            <div className="sea-region">
              <span>海岸方向</span>
            </div>
            <div className="hill-region">
              <span>信号山</span>
            </div>
            <div className="old-town-region" />
            <div className="people-district district-university">大学路片区</div>
            <div className="people-district district-oldtown">老城片区</div>
            <div className="people-district district-seaside">八大关 / 海岸</div>
            <div className="main-road road-a" />
            <div className="main-road road-b" />
            <div className="main-road road-c" />
            <div className="people-landmark landmark-roof" aria-hidden="true" />
            <div className="people-landmark landmark-book" aria-hidden="true" />
            <div className="people-landmark landmark-tree" aria-hidden="true" />

            {QINGDAO_PEOPLE.map((person) => {
              const active = hoveredPersonId === person.id || selectedPersonId === person.id;
              return (
                <button
                  type="button"
                  key={person.id}
                  className={`people-map-point${active ? ' active' : ''}`}
                  style={
                    {
                      '--x': `${person.mapPosition.x}%`,
                      '--y': `${person.mapPosition.y}%`,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => setHoveredPersonId(person.id)}
                  onMouseLeave={() => setHoveredPersonId((value) => (value === person.id ? null : value))}
                  onFocus={() => setHoveredPersonId(person.id)}
                  onBlur={() => setHoveredPersonId((value) => (value === person.id ? null : value))}
                  onClick={() => setSelectedPersonId(person.id)}
                >
                  <span className="people-map-avatar">{AVATAR_GLYPHS[person.avatarType]}</span>
                  <span className="people-map-name">{person.name}</span>
                  {active ? (
                    <span className="people-map-tooltip">
                      <strong>{person.name}</strong>
                      <em>{person.title}</em>
                      <small>相关地点：{person.relatedPlace}</small>
                      <p>{person.relation}</p>
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </section>

        <aside className="people-detail-column">
          <section className="map-card current-person-card">
            <div className="map-card-head">
              <span className="map-dot" />
              <h2>当前人物</h2>
            </div>
            <div className="current-person-body">
              <span className="current-person-avatar">{AVATAR_GLYPHS[currentPerson.avatarType]}</span>
              <div className="current-person-copy">
                <strong>{currentPerson.name}</strong>
                <em>{currentPerson.title}</em>
                <small>相关地点：{currentPerson.relatedPlace}</small>
                <p>青岛关系：{currentPerson.relation}</p>
                <button
                  type="button"
                  className={`current-person-action${relatedBuilding ? '' : ' disabled'}`}
                  onClick={() => relatedBuilding && onEnterBuilding(relatedBuilding.id)}
                  disabled={!relatedBuilding}
                >
                  {relatedBuilding ? '查看相关建筑' : '资料待完善'}
                </button>
                {!relatedBuilding ? (
                  <span className="current-person-tip">
                    后续将补充该人物相关旧居与 3D 建筑模型。
                  </span>
                ) : null}
              </div>
            </div>
          </section>

          <section className="map-card people-gallery-card">
            <div className="map-card-head">
              <span className="map-dot" />
              <h2>青岛文化名人</h2>
            </div>
            <div className="people-grid">
              {QINGDAO_PEOPLE.map((person) => {
                const active = person.id === selectedPersonId;
                return (
                  <button
                    type="button"
                    key={person.id}
                    className={`people-grid-card${active ? ' active' : ''}`}
                    onMouseEnter={() => setHoveredPersonId(person.id)}
                    onMouseLeave={() => setHoveredPersonId((value) => (value === person.id ? null : value))}
                    onFocus={() => setHoveredPersonId(person.id)}
                    onBlur={() => setHoveredPersonId((value) => (value === person.id ? null : value))}
                    onClick={() => setSelectedPersonId(person.id)}
                  >
                    <span className="people-grid-avatar">{AVATAR_GLYPHS[person.avatarType]}</span>
                    <strong>{person.name}</strong>
                    <em>{person.title}</em>
                    <small>{person.relation}</small>
                  </button>
                );
              })}
            </div>
          </section>
        </aside>
      </main>

      <footer className="time-map-footer">
        © 2026 青岛名人人物地图 · 用人物故事、城市空间与老建筑线索重访青岛记忆
      </footer>
    </div>
  );
}
