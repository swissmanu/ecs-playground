import ConsumerComponent from './components/consumer';
import GraphNodeComponent from './components/graphNode';
import ProducerComponent from './components/producer';
import StoreComponent from './components/store';
import EntityManager from './entityManager';
import System from './system';
import LogisticsSystem from './systems/logistics';
import ProductionSystem from './systems/production';

const entityManager = new EntityManager();

const nodeC = new GraphNodeComponent();
const nodeB = new GraphNodeComponent([nodeC]);
const nodeA = new GraphNodeComponent([nodeB]);

entityManager.addEntity(nodeA, new ProducerComponent(0.5), new StoreComponent());
entityManager.addEntity(nodeB, new StoreComponent());
entityManager.addEntity(nodeC, new StoreComponent());

const systems: ReadonlyArray<System> = [new LogisticsSystem(entityManager), new ProductionSystem(entityManager)];

export default {
  entityManager,
  systems,
};
