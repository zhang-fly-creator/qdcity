interface ArchiveImage {
  id: string;
  year: number;
  periodLabel: string;
  title: string;
  caption: string;
  imageUrl: string;
  type: 'building' | 'street' | 'person' | 'today' | 'archive';
  imageStatus?: 'placeholder' | 'ready';
}

interface Props {
  image: ArchiveImage;
  onOpen: () => void;
}

const TYPE_LABELS: Record<ArchiveImage['type'], string> = {
  building: '建筑影像',
  street: '街区影像',
  person: '人物记忆',
  today: '今日对比',
  archive: '城市档案',
};

const TYPE_GLYPHS: Record<ArchiveImage['type'], string> = {
  building: '▦',
  street: '⟂',
  person: '◉',
  today: '◎',
  archive: '▤',
};

export function ArchiveImageCard({ image, onOpen }: Props) {
  const showPlaceholder = image.imageStatus !== 'ready';

  return (
    <button type="button" className="archive-card" onClick={onOpen}>
      <div className="archive-media">
        {showPlaceholder ? (
          <div className={`archive-placeholder ${image.type}`}>
            <span className="archive-type-tag">{TYPE_LABELS[image.type]}</span>
            <strong>老照片占位</strong>
            <em>{image.periodLabel}</em>
            <small>资料待补充</small>
            <span className="archive-glyph">{TYPE_GLYPHS[image.type]}</span>
          </div>
        ) : (
          <img src={image.imageUrl} alt={image.title} loading="lazy" />
        )}
      </div>
      <div className="archive-copy">
        <span className="archive-period">{image.periodLabel}</span>
        <strong>{image.title}</strong>
        <p>{image.caption}</p>
        <small>查看大图</small>
      </div>
    </button>
  );
}
