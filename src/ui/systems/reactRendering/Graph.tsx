import React from 'react';
import { GuaranteedComponentMap } from '../../../simulation/entityManager/entityManager';

export type Edge = [
  from: GuaranteedComponentMap<'GraphNode' | 'Position'>,
  to: GuaranteedComponentMap<'GraphNode' | 'Position'>
];

interface GraphProps {
  edges: ReadonlyArray<Edge>;
  cellSize: number;
}

const Graph: React.FC<GraphProps> = ({ edges, cellSize }) => {
  return (
    <g>
      {edges.map(([from, to], i) => (
        <line
          key={i}
          x1={from.Position.left * cellSize + cellSize / 2}
          y1={from.Position.top * cellSize + cellSize / 2}
          x2={to.Position.left * cellSize + cellSize / 2}
          y2={to.Position.top * cellSize + cellSize / 2}
          stroke="darkgray"
          strokeWidth={6}
        />
      ))}
    </g>
  );
};
export default Graph;
