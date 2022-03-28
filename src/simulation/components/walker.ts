import Component from '../entityManager/component';
import { GuaranteedComponentMap } from '../entityManager/entityManager';

export default class WalkerComponent extends Component<typeof WalkerComponent.TypeTag> {
  static TypeTag = 'Walker' as const;

  constructor(public state: WalkerState, readonly velocity = 0.1) {
    super(WalkerComponent.TypeTag);
  }
}

type WalkerState = Idle | Moving | Arrived;

type Idle = {
  type: 'Idle';
  location: GuaranteedComponentMap<'Position' | 'GraphNode'>;
};

type Moving = {
  type: 'Moving';

  /**
   * Ids of all entities on the way to the target
   */
  path: ReadonlyArray<GuaranteedComponentMap<'Position' | 'GraphNode'>>;

  /**
   * Index of the current path segment in `path`.
   */
  currentPathSegment: number;

  segmentProgress: number;
};

type Arrived = {
  type: 'Arrived';
  location: GuaranteedComponentMap<'Position' | 'GraphNode'>;
};
