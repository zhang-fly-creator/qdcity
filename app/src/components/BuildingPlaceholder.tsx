import type { CellModel } from '../data/models';

interface Props {
  model: CellModel;
  compact?: boolean;
}

function iconForCategory(model: CellModel) {
  switch (model.id) {
    case 'governor-residence':
      return 'roof-castle';
    case 'governor-office':
      return 'civic-hall';
    case 'jiangsu-road-church':
    case 'st-michael-cathedral':
      return 'church-tower';
    case 'qingdao-railway-station':
      return 'rail-station';
    case 'post-museum':
      return 'post-house';
    case 'tsingtao-brewery':
      return 'factory';
    case 'laoshe-residence':
    case 'kang-youwei-residence':
      return 'courtyard-home';
    default:
      return 'coastal-villa';
  }
}

function labelForCategory(model: CellModel) {
  if (model.category === '名人故居') return '名人故居';
  if (model.category === '工业遗产') return '工业遗产';
  if (model.category === '交通地标') return '交通地标';
  if (model.category === '邮政建筑') return '邮政建筑';
  if (model.category === '宗教建筑' || model.category === '城市地标') return '老城教堂';
  if (model.category === '行政建筑') return '行政建筑';
  if (model.category === '八大关建筑') return '海滨别墅';
  return '德式官邸';
}

export function BuildingPlaceholder({ model, compact = false }: Props) {
  return (
    <div
      className={`building-placeholder${compact ? ' compact' : ''}`}
      style={{ '--accent': model.accent } as React.CSSProperties}
      aria-label={`${model.name} 建筑占位图`}
    >
      <div className={`building-placeholder-icon ${iconForCategory(model)}`} aria-hidden="true">
        <span className="icon-base" />
        <span className="icon-roof" />
        <span className="icon-detail" />
      </div>
      <div className="building-placeholder-copy">
        <strong>{model.name}</strong>
        <span>{labelForCategory(model)}</span>
      </div>
    </div>
  );
}
