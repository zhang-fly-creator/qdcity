import { useState } from 'react';
import type { CellModel } from '../data/models';
import {
  DEFAULT_RELATED_PEOPLE,
  getHeritageContent,
  type GuideMode,
  type RelatedPersonContent,
} from '../data/heritageContent';

interface Props {
  model: CellModel;
}

const GUIDE_LABELS: Record<GuideMode, string> = {
  child: '儿童版',
  visitor: '游客版',
  study: '研学版',
};

const AVATAR_LABELS: Record<RelatedPersonContent['avatarType'], string> = {
  laoshe: '书',
  kang: '卷',
  architect: '尺',
  ai: '星',
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

export function InfoPanel({ model }: Props) {
  const [guideMode, setGuideMode] = useState<GuideMode>('visitor');
  const content = getHeritageContent(model.id);
  const people = content?.relatedPeople?.length ? content.relatedPeople : DEFAULT_RELATED_PEOPLE;
  const guidePreview = content?.guideScripts[guideMode] ?? '';
  const story = content?.oneMinuteStory ?? model.description;
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

      <section className="info-card story-card">
        <span className="card-eyebrow">1 分钟故事</span>
        <p className="story-preview">{story}</p>
      </section>

      <section className="info-card related-people-card">
        <span className="card-eyebrow">相关人物</span>
        <div className="related-people-list">
          {people.map((person) => (
            <div className="related-person" key={person.name}>
              <span>{AVATAR_LABELS[person.avatarType]}</span>
              <div>
                <strong>{person.name}</strong>
                <em>{person.role}</em>
                <p>{person.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {content?.storyTags?.length ? (
        <section className="info-card">
          <span className="card-eyebrow">关键词</span>
          <div className="story-tags">
            {content.storyTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>
      ) : null}

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

      <section className="info-card fun-card">
        <span className="card-eyebrow">历史轶事</span>
        <p className="fun-text">{model.funFact}</p>
      </section>

      <section className="info-card occur-card">
        <span className="card-eyebrow">游览提示</span>
        <p>{model.whereItOccurs.text}</p>
        <div className="habitat">{model.whereItOccurs.habitat}</div>
      </section>
    </aside>
  );
}
