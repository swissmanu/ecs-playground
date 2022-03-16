import Component from '../entityManager/component';

export default class ProducerComponent extends Component<typeof ProducerComponent.TypeTag> {
  static TypeTag = 'Producer' as const;

  constructor(readonly productivity = 1, public progress = 0) {
    super(ProducerComponent.TypeTag);
  }
}
