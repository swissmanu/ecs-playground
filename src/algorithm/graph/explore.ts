import GraphNodeComponent from '../../simulation/components/graphNode';

export default function explore(start: GraphNodeComponent): {
  edges: ReadonlyArray<
    [from: GraphNodeComponent, to: GraphNodeComponent, data: GraphNodeComponent['edges'][0]['data']]
  >;
  nodes: ReadonlyArray<GraphNodeComponent>;
} {
  // Discovered nodes and edges:
  const nodes: Set<GraphNodeComponent> = new Set();
  const edges: [from: GraphNodeComponent, to: GraphNodeComponent, data: GraphNodeComponent['edges'][0]['data']][] = [];

  // Currently discovered nodes, up for further processing:
  const work: GraphNodeComponent[] = [start];

  let from: GraphNodeComponent | undefined;
  while ((from = work.pop()) !== undefined) {
    nodes.add(from);

    for (const { target: to, data } of from.edges) {
      if (!nodes.has(to)) {
        edges.push([from, to, data]);
        work.push(to);
      }
    }
  }

  return {
    edges,
    nodes: [...nodes],
  };
}
