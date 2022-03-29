import React from 'react';
import explore from '../../../algorithm/graph/explore';
import GraphNodeComponent from '../../../simulation/components/graphNode';
import PositionComponent from '../../../simulation/components/position';
import EntityManager from '../../../simulation/entityManager/entityManager';
import add from '../../util/vector/add';
import multiplyWithScalar from '../../util/vector/multiplyWithScalar';
import positionAsVector from '../../util/vector/positionAsVector';
import subtract from '../../util/vector/subtract';

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
      edges.reduce<
        ReadonlyArray<[from: PositionComponent, to: PositionComponent, data: GraphNodeComponent['edges'][0]['data']]>
      >((acc, [{ entityId: fromId }, { entityId: toId }, data]) => {
        const from = entityManager.getEntityWithComponents(fromId, 'Position');
        const to = entityManager.getEntityWithComponents(toId, 'Position');

        if (from && to) {
          return [...acc, [from.Position, to.Position, data]];
        }
        return acc;
      }, []),
    [edges, entityManager]
  );

  return (
    <g>
      {positions.map(([from, to, data], i) => {
        const origin = positionAsVector(from);
        const direction = subtract(positionAsVector(to), origin);
        const relative = multiplyWithScalar(direction, 0.5);
        const absolute = add(multiplyWithScalar(add(origin, relative), cellSize), [cellSize / 2, cellSize / 2]);

        return (
          <g key={i}>
            <line
              x1={from.left * cellSize + cellSize / 2}
              y1={from.top * cellSize + cellSize / 2}
              x2={to.left * cellSize + cellSize / 2}
              y2={to.top * cellSize + cellSize / 2}
              stroke="darkgray"
              strokeWidth={6}
            />
            <text x={absolute[0]} y={absolute[1]} fontWeight="bold">
              {data}
            </text>
          </g>
        );
      })}
    </g>
  );
};
export default Graph;
