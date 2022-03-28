import EntityManager from '../../../simulation/entityManager';
import React from 'react';
import Grid from './Grid';
import Entity from './Entity';
import Graph, { Edge } from './Graph';
import { GuaranteedComponentMap } from '../../../simulation/entityManager/entityManager';
import Walker from './Walker';

interface ReactRenderingProps {
  entityManager: EntityManager;
}

const CELL_SIZE = 50;

const ReactRenderer: React.FC<ReactRenderingProps> = ({ entityManager }) => {
  const positions = React.useMemo(() => entityManager.getEntitiesWithComponent('Position'), []);
  const graphEdges = React.useMemo(
    () =>
      entityManager
        .getEntitiesWithComponent('GraphNode', 'Position')
        .reduce<ReadonlyArray<Edge>>((edges, [, fromComponents]) => {
          return [
            ...edges,
            ...fromComponents.GraphNode.neighbors.reduce<ReadonlyArray<Edge>>((acc, toGraphNode) => {
              const to = entityManager.getEntityWithComponents(toGraphNode.entityId, 'Position');
              if (to) {
                return [...acc, [fromComponents, to as GuaranteedComponentMap<'Position' | 'GraphNode'>]];
              }
              return acc;
            }, []),
          ];
        }, []),
    []
  );

  const walkers = React.useMemo(() => entityManager.getEntitiesWithComponent('Walker'), []);

  return (
    <div>
      <Grid numberOfCells={[10, 10]} cellSize={CELL_SIZE}>
        <Graph edges={graphEdges} cellSize={CELL_SIZE} />
        {positions.map(([id, components]) => (
          <g
            key={id}
            transform={`translate(${components.Position.left * CELL_SIZE}, ${components.Position.top * CELL_SIZE})`}
          >
            <Entity id={id} components={components} cellSize={CELL_SIZE} />
          </g>
        ))}
        {walkers.map(([id, components]) => (
          <Walker key={id} state={components.Walker.state} cellSize={CELL_SIZE} />
        ))}
      </Grid>
      <pre>{JSON.stringify([...entityManager.allEntities().values()], null, 2)}</pre>
    </div>
  );
};
export default ReactRenderer;
