import { Html } from '@react-three/drei';
import { getHeritageContent } from '../data/heritageContent';
import type { PanoramaMarker as PanoramaMarkerType } from '../data/panoramaMarkers';

interface Props {
  marker: PanoramaMarkerType;
  active: boolean;
  visible: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

export function PanoramaMarker({
  marker,
  active,
  visible,
  onHoverStart,
  onHoverEnd,
  onClick,
}: Props) {
  if (!visible) return null;

  const encounter = getHeritageContent(marker.modelId)?.encounterCharacter;

  return (
    <group position={marker.position}>
      <Html center distanceFactor={10} transform={false}>
        <div className="panorama-marker-wrap">
          <button
            type="button"
            className={`panorama-marker${active ? ' active' : ''}`}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            onFocus={onHoverStart}
            onBlur={onHoverEnd}
            onClick={onClick}
            aria-label={`进入 ${marker.label} 3D 展厅`}
          >
            <span>{marker.index}</span>
          </button>
          {active ? (
            <div className="panorama-marker-card">
              <strong>{marker.label}</strong>
              <em>{marker.category}</em>
              <p>{marker.shortDescription}</p>
              <small>可偶遇：{encounter?.name ?? '历史讲述人'}</small>
              <b>点击进入 3D 展厅</b>
            </div>
          ) : null}
        </div>
      </Html>
    </group>
  );
}
