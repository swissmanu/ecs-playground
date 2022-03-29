import Heap from 'heap';

type Entry<Vertex> = [priority: number, to: Vertex];

/**
 * @param start
 * @param goal
 * @param getEdges
 * @param getVertex
 * @param calculateCost
 * @param heuristic
 * @returns
 * @see https://www.redblobgames.com/pathfinding/a-star/introduction.html ❤️
 */
export default function findPath<Vertex, Edge>(
  start: Vertex,
  goal: Vertex,
  getEdges: (vertex: Vertex) => ReadonlyArray<Edge>,
  getVertex: (edge: Edge) => Vertex,
  calculateCost: (from: Vertex, via: Edge) => number,
  heuristic: (target: Vertex, current: Vertex, cost: number) => number
): ReadonlyArray<Vertex> {
  const frontier: Heap<Entry<Vertex>> = new Heap(([a], [b]) => a - b);
  frontier.insert([0, start]);

  const cameFrom: Map<Vertex, Vertex | null> = new Map([[start, null]]);
  const costSofar: Map<Vertex, number> = new Map([[start, 0]]);

  while (!frontier.empty()) {
    const [, currentVertex] = frontier.pop();

    if (currentVertex === goal) {
      break;
    }

    for (const edge of getEdges(currentVertex)) {
      const next = getVertex(edge);
      const newCost = (costSofar.get(currentVertex) ?? 0) + calculateCost(currentVertex, edge);

      if (!costSofar.has(next) || newCost < (costSofar.get(next) ?? 0)) {
        costSofar.set(next, newCost);

        const priority = heuristic(goal, next, newCost);
        frontier.insert([priority, next]);
        cameFrom.set(next, currentVertex);
      }
    }
  }

  const path: Vertex[] = [];
  let current: Vertex = goal;
  while (current !== start) {
    path.unshift(current);
    const n = cameFrom.get(current);
    if (n) {
      current = n;
    } else {
      break;
    }
  }
  path.unshift(start);

  return path;
}
