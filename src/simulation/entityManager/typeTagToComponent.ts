import WalkerComponent from '../components/walker';
import ConsumerComponent from '../components/consumer';
import GraphNodeComponent from '../components/graphNode';
import PositionComponent from '../components/position';
import ProducerComponent from '../components/producer';
import StoreComponent from '../components/store';

export type TypeTagToComponent = {
  [GraphNodeComponent.TypeTag]: GraphNodeComponent;
  [ProducerComponent.TypeTag]: ProducerComponent;
  [ConsumerComponent.TypeTag]: ConsumerComponent;
  [StoreComponent.TypeTag]: StoreComponent;
  [PositionComponent.TypeTag]: PositionComponent;
  [WalkerComponent.TypeTag]: WalkerComponent;
};
