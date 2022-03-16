import Component from "../entityManager/component";

export default class StoreComponent extends Component<
  typeof StoreComponent.TypeTag
> {
  static TypeTag = "Store" as const;

  constructor() {
    super(StoreComponent.TypeTag);
  }
}
