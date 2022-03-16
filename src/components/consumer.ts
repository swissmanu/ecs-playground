import Component from "../entityManager/component";

export default class ConsumerComponent extends Component<
  typeof ConsumerComponent.TypeTag
> {
  static TypeTag = "Consumer" as const;

  constructor() {
    super(ConsumerComponent.TypeTag);
  }
}
