import React from 'react';
import EntityManager from '../../../simulation/entityManager';
import Entity from './Entity';
import Graph from './Graph';
import Grid from './Grid';
import Walker from './Walker';

interface ReactRenderingProps {
  entityManager: EntityManager;
}

const CELL_SIZE = 50;

const ReactRenderer: React.FC<ReactRenderingProps> = ({ entityManager }) => {
  const positions = React.useMemo(() => entityManager.getEntitiesWithComponent('Position'), [entityManager]);
  const walkers = React.useMemo(() => entityManager.getEntitiesWithComponent('Walker'), [entityManager]);

  const [selectedEntityId, selectEntityId] = React.useState<string | null>(null);

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Grid numberOfCells={[10, 10]} cellSize={CELL_SIZE}>
        <Graph entityManager={entityManager} cellSize={CELL_SIZE} />
        {positions.map(([id, components]) => (
          <g
            key={id}
            transform={`translate(${components.Position.left * CELL_SIZE}, ${components.Position.top * CELL_SIZE})`}
          >
            <Entity id={id} components={components} cellSize={CELL_SIZE} onClick={() => selectEntityId(id)} />
          </g>
        ))}
        {walkers.map(([id, components]) => (
          <Walker
            key={id}
            state={components.Walker.state}
            cellSize={CELL_SIZE}
            entityManager={entityManager}
            onClick={() => selectEntityId(id)}
          />
        ))}
      </Grid>
      {selectedEntityId && (
        <pre>{JSON.stringify(entityManager.getEntity(selectedEntityId), getCircularReplacer(), 2)}</pre>
      )}
    </div>
  );
};
export default ReactRenderer;

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (_key: string, value: unknown) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
