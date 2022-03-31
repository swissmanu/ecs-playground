import React from 'react';
import WalkerComponent from '../../../simulation/components/walker';
import EntityManager from '../../../simulation/entityManager';
import add from '../../util/vector/add';
import asSVGTranslate from '../../util/vector/asSVGTranslate';
import multiplyWithScalar from '../../util/vector/multiplyWithScalar';
import positionAsVector from '../../util/vector/positionAsVector';
import subtract from '../../util/vector/subtract';

interface WalkerProps {
  state: WalkerComponent['state'];
  cellSize: number;
  entityManager: EntityManager;
  onClick?: () => void;
}

const Walker: React.FC<WalkerProps> = ({ state, cellSize, onClick, entityManager }) => {
  const onClickCircle = React.useCallback(
    (e: React.MouseEvent) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  switch (state.type) {
    case 'Idle': {
      const position = entityManager.getEntityWithComponents(state.location.entityId, 'Position');
      if (!position) {
        return null;
      }

      return (
        <g transform={`translate(${position.Position.left * cellSize}, ${position.Position.top * cellSize})`}>
          <circle
            cx={cellSize / 2}
            cy={cellSize / 2}
            r={cellSize / 4}
            fill="teal"
            stroke="black"
            strokeWidth={4}
            onClick={onClickCircle}
          />
        </g>
      );
    }

    case 'Moving': {
      const segmentStart = entityManager.getEntityWithComponents(
        state.path[state.currentPathSegment].entityId,
        'Position'
      );
      const segmentEnd = entityManager.getEntityWithComponents(
        state.path[state.currentPathSegment + 1].entityId,
        'Position'
      );

      if (!segmentStart || !segmentEnd) {
        return null;
      }

      const origin = positionAsVector(segmentStart.Position);
      const direction = subtract(positionAsVector(segmentEnd.Position), origin);
      const relative = multiplyWithScalar(direction, state.segmentProgress);
      const absolute = multiplyWithScalar(add(origin, relative), cellSize);

      return (
        <g transform={asSVGTranslate(absolute)}>
          <circle
            cx={cellSize / 2}
            cy={cellSize / 2}
            r={cellSize / 4}
            fill="orange"
            stroke="black"
            strokeWidth={4}
            onClick={onClickCircle}
          />
        </g>
      );
    }

    case 'Arrived': {
      const position = entityManager.getEntityWithComponents(state.location.entityId, 'Position');
      if (!position) {
        return null;
      }

      return (
        <g transform={`translate(${position.Position.left * cellSize}, ${position.Position.top * cellSize})`}>
          <circle
            cx={cellSize / 2}
            cy={cellSize / 2}
            r={cellSize / 4}
            fill="yellow"
            stroke="black"
            strokeWidth={4}
            onClick={onClickCircle}
          />
        </g>
      );
    }
  }
};
export default Walker;
