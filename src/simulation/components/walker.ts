import Component from '../entityManager/component';
import GraphNodeComponent from './graphNode';

export default class WalkerComponent extends Component<typeof WalkerComponent.TypeTag> {
  static TypeTag = 'Walker' as const;

  constructor(public state: WalkerState, readonly speed = 1) {
    super(WalkerComponent.TypeTag);
  }
}

type WalkerState = Idle | Moving | Arrived;

type Idle = {
  type: 'Idle';
  location: GraphNodeComponent;
};

type Moving = {
  type: 'Moving';

  start: GraphNodeComponent;

  /**
   * Ids of all entities on the way to the target
   */
  path: ReadonlyArray<GraphNodeComponent['edges'][0]>;

  /**
   * Index of the current path segment in `path`.
   */
  currentPathSegment: number;

  segmentProgress: number;
};

type Arrived = {
  type: 'Arrived';
  location: GraphNodeComponent;
};
