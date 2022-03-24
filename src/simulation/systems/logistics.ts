import StoreComponent from '../components/store';
import System from '../system';

export default class LogisticsSystem extends System {
  update(): void {
    for (const [id, components] of this.entityManager.entitiesWithComponent('Store', 'GraphNode')) {
      if (components.Store.storedItems > 0) {
        const neighborStores = components.GraphNode.neighbors.reduce<ReadonlyArray<StoreComponent>>(
          (acc, { entityId }) => {
            const neighbor = this.entityManager.getEntity(entityId);
            if (neighbor?.Store) {
              return [...acc, neighbor.Store!];
            }
            return acc;
          },
          []
        );

        if (neighborStores.length > 0) {
          const [first] = neighborStores;
          first.storedItems++;
          components.Store.storedItems--;
        }
      }
    }
  }
}
