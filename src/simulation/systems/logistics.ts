import findPath from '../../algorithm/graph/astar';
import djikstraHeuristic from '../../algorithm/graph/astar/heuristics/djikstra';
import GraphNodeComponent from '../components/graphNode';
import System from '../system';

export default class LogisticsSystem extends System {
  update(): void {
    for (const [, components] of this.entityManager.getEntitiesWithComponent('Walker')) {
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

          const edgePath = path.reduce<ReadonlyArray<GraphNodeComponent['edges'][0]>>((acc, x, i) => {
            if (i === 0) {
              return acc;
            }
            const prev = i === 0 ? from : path[i - 1];
            const edge = prev.edges.find(({ target }) => target === x);
            if (edge) {
              return [...acc, edge];
            }
            return acc;
          }, []);

          components.Walker.state = {
            type: 'Moving',
            start: from,
            path: edgePath,
            currentPathSegment: 0,
            segmentProgress: 0,
          };
        }
      } else if (components.Walker.state.type === 'Moving') {
        if (components.Walker.state.segmentProgress < 1) {
          const edgeWeight = components.Walker.state.path[components.Walker.state.currentPathSegment].data;
          const progressDiff = 1 / edgeWeight;
          components.Walker.state.segmentProgress = Math.min(1, components.Walker.state.segmentProgress + progressDiff);
        } else if (components.Walker.state.segmentProgress >= 1) {
          if (components.Walker.state.currentPathSegment === components.Walker.state.path.length - 1) {
            components.Walker.state = {
              type: 'Arrived',
              location: components.Walker.state.path[components.Walker.state.path.length - 1].target,
            };
          } else {
            components.Walker.state.currentPathSegment++;

            const edgeWeight = components.Walker.state.path[components.Walker.state.currentPathSegment].data;
            const progressDiff = 1 / edgeWeight;
            components.Walker.state.segmentProgress = progressDiff;
          }
        }
      } else if (components.Walker.state.type === 'Arrived') {
        components.Walker.state = { type: 'Idle', location: components.Walker.state.location };
      }
    }
  }
}
