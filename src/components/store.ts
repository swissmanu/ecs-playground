import Component from '../entityManager/component';

export default class StoreComponent extends Component<typeof StoreComponent.TypeTag> {
  static TypeTag = 'Store' as const;

  public storedItems = 0;

  constructor() {
    super(StoreComponent.TypeTag);
  }
}
