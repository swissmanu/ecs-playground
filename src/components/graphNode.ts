import Component from "../entityManager/component";

export default class GraphNodeComponent extends Component<
  typeof GraphNodeComponent.TypeTag
> {
  static TypeTag = "GraphNode" as const;

  constructor(readonly neighbors: ReadonlyArray<GraphNodeComponent> = []) {
    super(GraphNodeComponent.TypeTag);
  }
}
