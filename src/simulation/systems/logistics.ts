import findPath from '../../algorithm/graph/astar';
import djikstraHeuristic from '../../algorithm/graph/astar/heuristics/djikstra';
import System from '../system';

export default class LogisticsSystem extends System {
  update(): void {
    for (const [id, components] of this.entityManager.getEntitiesWithComponent('Walker')) {
      if (components.Walker.state.type === 'Idle') {
        const from = components.Walker.state.location;

        const hasConsumer =
          this.entityManager.getEntityWithComponents(components.Walker.state.location.entityId, 'Consumer') !== null;
        const [to] = hasConsumer
          ? this.entityManager.getEntitiesWithComponent('Producer', 'Store', 'GraphNode')
          : this.entityManager.getEntitiesWithComponent('Consumer', 'Store', 'GraphNode');

        if (from && to) {
          const path = findPath(
            from,
            to[1].GraphNode,
            ({ edges }) => edges,
            ({ target }) => target,
            (_, { data }) => data,
            djikstraHeuristic
          );

          components.Walker.state = { type: 'Moving', path, currentPathSegment: 0, segmentProgress: 0 };
        }
      } else if (components.Walker.state.type === 'Moving') {
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
