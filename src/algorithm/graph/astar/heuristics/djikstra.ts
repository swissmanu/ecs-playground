import GraphNodeComponent from '../../../../simulation/components/graphNode';

/**
 * Heuristics function ignoring any information except the total cost of a path.
 *
 * @param from
 * @param to
 * @param cost
 * @returns
 * @see https://www.redblobgames.com/pathfinding/a-star/introduction.html ❤️
 */
export default function djikstraHeuristic(from: GraphNodeComponent, to: GraphNodeComponent, cost: number): number {
  return cost;
}
