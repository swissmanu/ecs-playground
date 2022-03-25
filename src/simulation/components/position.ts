import Component from '../entityManager/component';

export default class PositionComponent extends Component<typeof PositionComponent.TypeTag> {
  static TypeTag = 'Position' as const;

  constructor(readonly top: number, readonly left: number) {
    super(PositionComponent.TypeTag);
  }
}
