import System from '../system';

export default class ProductionSystem extends System {
  update(): void {
    for (const [, components] of this.entityManager.getEntitiesWithComponent('Producer', 'Store')) {
      if (components.Producer.progress === 1) {
        components.Store.storedItems++;
        components.Producer.progress = 0;
      } else {
        components.Producer.progress = Math.min(components.Producer.progress + components.Producer.productivity, 1);
      }
    }
  }
}
