import Component from '../entityManager/component';

export default class GraphNodeComponent extends Component<typeof GraphNodeComponent.TypeTag> {
  static TypeTag = 'GraphNode' as const;

  constructor(public neighbors: ReadonlyArray<GraphNodeComponent> = []) {
    super(GraphNodeComponent.TypeTag);

    neighbors.forEach((n) => (n.neighbors = [...n.neighbors, this]));
  }
}
