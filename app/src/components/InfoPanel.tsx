import { useState } from 'react';
import type { CellModel } from '../data/models';
import {
  getHeritageContent,
  type GuideMode,
} from '../data/heritageContent';

interface Props {
  model: CellModel;
}

const GUIDE_LABELS: Record<GuideMode, string> = {
  child: '儿童版',
  visitor: '游客版',
  study: '研学版',
};

const ENCOUNTER_AVATARS = {
  architect: '🏛️',
  planner: '🧭',
  tower: '🔔',
  photographer: '📷',
  traveler: '🧳',
  postman: '✉️',
  factory: '🏭',
  writer: '📖',
  thinker: '📜',
  seaside: '🌊',
} as const;

function FocusGuideCard({ model }: { model: CellModel }) {
  if (model.id !== 'st-michael-cathedral') return null;

  return (
    <section className="info-card focus-guide-card">
      <span className="card-eyebrow">楼层拆解导览图</span>
      <div className="guide-image-card">
        <img
          src={`${import.meta.env.BASE_URL}images/guide/st-michael-guide.png`.replace(/\/+/g, '/')}
          alt="青岛天主教堂楼层拆解导览图"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export function InfoPanel({ model }: Props) {
  const [guideMode, setGuideMode] = useState<GuideMode>('visitor');
  const content = getHeritageContent(model.id);
  const guidePreview = content?.guideScripts[guideMode] ?? '';
  const encounter = content?.encounterCharacter;

  return (
    <aside className="info-panel" style={{ '--accent': model.accent } as React.CSSProperties}>
      <section className="info-card hero-card">
        <header>
          <span className="card-eyebrow">本节焦点</span>
          <h2>{model.name}</h2>
          <p className="info-tagline">{model.subtitle}</p>
        </header>
        <dl className="info-grid">
          <div>
            <dt>建筑类型</dt>
            <dd>{model.category}</dd>
          </div>
          <div>
            <dt>建造年代</dt>
            <dd>{model.size}</dd>
          </div>
          <div>
            <dt>地址</dt>
            <dd>{model.location}</dd>
          </div>
          <div>
            <dt>今日属性</dt>
            <dd>
              <span className="pill on">{model.visibleInLM}</span>
            </dd>
          </div>
        </dl>
      </section>

      <FocusGuideCard model={model} />

      <section className="info-card">
        <span className="card-eyebrow">建筑故事</span>
        <p className="info-description">{model.description}</p>
      </section>

      <section className="info-card ai-card">
        <span className="card-eyebrow">实地打卡 · 偶遇历史人物</span>
        <div className="ai-guide-panel">
          <div>
            <div className="ai-guide-top">
              <div className="ai-guide-copy">
                <p>
                  到达建筑现场后，扫码进入元盒 AI 伴游小程序，即可激活本建筑的历史人物偶遇。人物将带你听建筑故事、完成现场观察任务、拍照打卡，并领取青岛老建筑数字徽章。
                </p>
                <p className="ai-guide-title">扫码到现场，激活「{model.name}」偶遇任务</p>
                <p className="checkin-note">正式版可接入微信小程序、H5 伴游页、NFC 建筑徽章或景区导览系统。</p>
              </div>
              <div className="qr-placeholder" aria-label="小程序码占位">
                <span>小程序码</span>
                <span>偶遇任务入口</span>
                <small>演示占位</small>
              </div>
            </div>
            {encounter ? (
              <div className="encounter-card">
                <span className="encounter-badge">当前可偶遇</span>
                <div className="encounter-meta">
                  <span className="encounter-avatar">{ENCOUNTER_AVATARS[encounter.avatarType]}</span>
                  <div>
                    <strong>{encounter.name}</strong>
                    <em>{encounter.role}</em>
                    <p>{encounter.unlockText}</p>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="checkin-task-list">
              {(content?.checkinTasks ?? []).map((task) => (
                <div className="checkin-task" key={task}>
                  <span>✓</span>
                  <small>{task}</small>
                </div>
              ))}
            </div>
            <strong className="guide-mode-title">讲解模式</strong>
            <div className="ai-mode-buttons">
              {(['child', 'visitor', 'study'] as GuideMode[]).map((mode) => (
                <button
                  type="button"
                  key={mode}
                  className={guideMode === mode ? 'active' : ''}
                  onClick={() => setGuideMode(mode)}
                >
                  {GUIDE_LABELS[mode]}
                </button>
              ))}
            </div>
            <div className="guide-preview">
              <strong>{GUIDE_LABELS[guideMode]}讲解</strong>
              <p>{guidePreview}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="info-card">
        <span className="card-eyebrow">建筑看点</span>
        <ul className="feature-list">
          {model.features.map((f) => (
            <li key={f.name}>
              <span className="feature-dot" />
              <div>
                <div className="feature-name">{f.name}</div>
                <div className="feature-detail">{f.detail}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

    </aside>
  );
}
