import Component from "../entityManager/component";

export default class ProducerComponent extends Component<
  typeof ProducerComponent.TypeTag
> {
  static TypeTag = "Producer" as const;

  constructor() {
    super(ProducerComponent.TypeTag);
  }
}
