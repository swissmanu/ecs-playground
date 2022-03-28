import WalkerComponent from '../../../simulation/components/walker';
import { GuaranteedComponentMap } from '../../../simulation/entityManager/entityManager';
import React from 'react';

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
      const from = state.path[state.currentPathSegment];
      const to = state.path[state.currentPathSegment + 1];

      const p_from = [from.Position.left, from.Position.top];
      const p_to = [to.Position.left, to.Position.top];

      const vector = [p_to[0] - p_from[0], p_to[1] - p_from[1]];
      const current = [vector[0] * state.segmentProgress, vector[1] * state.segmentProgress];

      return (
        <g transform={`translate(${(p_from[0] + current[0]) * cellSize}, ${(p_from[1] + current[1]) * cellSize})`}>
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
