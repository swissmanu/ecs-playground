import React from 'react';
import WalkerComponent from '../../../simulation/components/walker';
import add from '../../util/vector/add';
import asSVGTranslate from '../../util/vector/asSVGTranslate';
import multiplyWithScalar from '../../util/vector/multiplyWithScalar';
import positionAsVector from '../../util/vector/positionAsVector';
import subtract from '../../util/vector/subtract';

interface WalkerProps {
  state: WalkerComponent['state'];
  cellSize: number;
}

const Walker: React.FC<WalkerProps> = ({ state, cellSize }) => {
  switch (state.type) {
    case 'Idle':
      return (
        <g
          transform={`translate(${state.location.Position.left * cellSize}, ${state.location.Position.top * cellSize})`}
        >
          <circle cx={cellSize / 2} cy={cellSize / 2} r={cellSize / 4} fill="teal" stroke="black" strokeWidth={4} />
        </g>
      );

    case 'Moving': {
      const segmentStart = state.path[state.currentPathSegment];
      const segmentEnd = state.path[state.currentPathSegment + 1];

      const origin = positionAsVector(segmentStart.Position);
      const direction = subtract(positionAsVector(segmentEnd.Position), origin);
      const relative = multiplyWithScalar(direction, state.segmentProgress);
      const absolute = multiplyWithScalar(add(origin, relative), cellSize);

      return (
        <g transform={asSVGTranslate(absolute)}>
          <circle cx={cellSize / 2} cy={cellSize / 2} r={cellSize / 4} fill="orange" stroke="black" strokeWidth={4} />
        </g>
      );
    }

    case 'Arrived':
      return (
        <g
          transform={`translate(${state.location.Position.left * cellSize}, ${state.location.Position.top * cellSize})`}
        >
          <circle cx={cellSize / 2} cy={cellSize / 2} r={cellSize / 4} fill="yellow" stroke="black" strokeWidth={4} />
        </g>
      );
  }
};
export default Walker;
