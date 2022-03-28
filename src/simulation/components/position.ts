import Component from '../entityManager/component';

export default class PositionComponent extends Component<typeof PositionComponent.TypeTag> {
  static TypeTag = 'Position' as const;

  constructor(readonly left: number, readonly top: number) {
    super(PositionComponent.TypeTag);
  }
}
