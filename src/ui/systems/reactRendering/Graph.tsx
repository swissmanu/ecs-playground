import React from 'react';
import explore from '../../../algorithm/graph/explore';
import GraphNodeComponent from '../../../simulation/components/graphNode';
import PositionComponent from '../../../simulation/components/position';
import EntityManager from '../../../simulation/entityManager/entityManager';

export type Edge = [from: GraphNodeComponent, to: GraphNodeComponent];

interface GraphProps {
  entityManager: EntityManager;
  cellSize: number;
}

const Graph: React.FC<GraphProps> = ({ entityManager, cellSize }) => {
  const edges = React.useMemo(() => {
    const [first] = entityManager.getEntitiesWithComponent('GraphNode');
    if (first) {
      const { edges } = explore(first[1].GraphNode);
      return edges;
    }
    return [];
  }, [entityManager]);

  const positions = React.useMemo(
    () =>
      edges.reduce<ReadonlyArray<[from: PositionComponent, to: PositionComponent]>>(
        (acc, [{ entityId: fromId }, { entityId: toId }]) => {
          const from = entityManager.getEntityWithComponents(fromId, 'Position');
          const to = entityManager.getEntityWithComponents(toId, 'Position');

          if (from && to) {
            return [...acc, [from.Position, to.Position]];
          }
          return acc;
        },
        []
      ),
    [edges, entityManager]
  );

  return (
    <g>
      {positions.map(([from, to], i) => (
        <line
          key={i}
          x1={from.left * cellSize + cellSize / 2}
          y1={from.top * cellSize + cellSize / 2}
          x2={to.left * cellSize + cellSize / 2}
          y2={to.top * cellSize + cellSize / 2}
          stroke="darkgray"
          strokeWidth={6}
        />
      ))}
    </g>
  );
};
export default Graph;
