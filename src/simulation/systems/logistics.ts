import StoreComponent from '../components/store';
import System from '../system';

export default class LogisticsSystem extends System {
  update(): void {
    for (const [id, components] of this.entityManager.getEntitiesWithComponent('Walker')) {
      if (components.Walker.state.type === 'Moving') {
        if (components.Walker.state.segmentProgress < 1) {
          components.Walker.state.segmentProgress = Math.min(
            1,
            components.Walker.state.segmentProgress + components.Walker.velocity
          );
        } else if (components.Walker.state.segmentProgress >= 1) {
          if (components.Walker.state.currentPathSegment === components.Walker.state.path.length - 2) {
            components.Walker.state = {
              type: 'Arrived',
              location: components.Walker.state.path[components.Walker.state.path.length - 1],
            };
          } else {
            components.Walker.state.segmentProgress = 0;
            components.Walker.state.currentPathSegment++;
          }
        }
      } else if (components.Walker.state.type === 'Arrived') {
        components.Walker.state = { type: 'Idle', location: components.Walker.state.location };
      }
    }
  }
}
