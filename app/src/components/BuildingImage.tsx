import { useState } from 'react';
import type { CellModel } from '../data/models';
import { BuildingPlaceholder } from './BuildingPlaceholder';

interface Props {
  model: CellModel;
  compact?: boolean;
}

export function BuildingImage({ model, compact = false }: Props) {
  const [failed, setFailed] = useState(false);
  const shouldUsePlaceholder = model.imageStatus === 'placeholder' || failed;

  if (shouldUsePlaceholder) {
    return <BuildingPlaceholder model={model} compact={compact} />;
  }

  return (
    <img
      src={model.imageUrl}
      alt={model.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
