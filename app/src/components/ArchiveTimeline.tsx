import { useMemo, useState } from 'react';
import { getHeritageContent } from '../data/heritageContent';
import type { CellModel } from '../data/models';

interface Props {
  model: CellModel;
}

const TYPE_LABELS = {
  building: '建筑影像',
  street: '街区影像',
  person: '人物记忆',
  today: '今日对比',
  archive: '城市档案',
} as const;

const TYPE_GLYPHS = {
  building: '▦',
  street: '⟂',
  person: '◉',
  today: '◎',
  archive: '▤',
} as const;

export function ArchiveTimeline({ model }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const archiveImages = useMemo(
    () =>
      [...(getHeritageContent(model.id)?.archiveImages ?? [])].sort(
        (a, b) => a.year - b.year
      ),
    [model.id]
  );
  const selectedImage = useMemo(
    () => archiveImages.find((item) => item.id === selectedId) ?? null,
    [archiveImages, selectedId]
  );

  return (
    <section className="archive-gallery-card timeline-card">
      <div className="archive-gallery-head">
        <h3>图像时间轴｜从老照片到今日现状，查看建筑的时光变化</h3>
      </div>

      <div className="timeline-scroll">
        <div className="timeline-line" aria-hidden="true" />
        {archiveImages.map((image) => (
          <button
            type="button"
            key={image.id}
            className={`timeline-item${image.type === 'today' ? ' today' : ''}`}
            onClick={() => setSelectedId(image.id)}
          >
            <span className="timeline-node" />
            <div className="timeline-card-shell">
              <div className={`archive-placeholder ${image.type}`}>
                <span className="archive-type-tag">{TYPE_LABELS[image.type]}</span>
                <strong>老照片占位</strong>
                <em>{image.periodLabel}</em>
                <small>资料待补充</small>
                <span className="archive-glyph">{TYPE_GLYPHS[image.type]}</span>
              </div>
              <div className="archive-copy">
                <span className="archive-period">{image.periodLabel}</span>
                <strong>{image.title}</strong>
                <p>{image.caption}</p>
                <small>查看大图</small>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedImage ? (
        <div
          className="archive-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="archive-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="archive-modal-close"
              onClick={() => setSelectedId(null)}
            >
              关闭
            </button>
            <div className="archive-modal-media">
              <div className={`archive-placeholder ${selectedImage.type}`}>
                <span className="archive-type-tag">{selectedImage.periodLabel}</span>
                <strong>老照片占位</strong>
                <em>{selectedImage.title}</em>
                <small>资料待补充</small>
              </div>
            </div>
            <div className="archive-modal-copy">
              <span className="archive-period">{selectedImage.periodLabel}</span>
              <strong>{selectedImage.title}</strong>
              <p>{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
