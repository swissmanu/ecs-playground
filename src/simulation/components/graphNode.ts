import Component from '../entityManager/component';

export default class GraphNodeComponent extends Component<typeof GraphNodeComponent.TypeTag> {
  static TypeTag = 'GraphNode' as const;

  constructor(public edges: ReadonlyArray<Edge<number>> = []) {
    super(GraphNodeComponent.TypeTag);

    // Create back references:
    edges.forEach(({ data, target }) => (target.edges = [...target.edges, { target: this, data }]));
  }
}

interface Edge<T> {
  target: GraphNodeComponent;
  data: T;
}
