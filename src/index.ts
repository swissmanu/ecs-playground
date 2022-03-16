import ConsumerComponent from "./components/consumer";
import GraphNodeComponent from "./components/graphNode";
import ProducerComponent from "./components/producer";
import StoreComponent from "./components/store";
import EntityManager from "./entityManager";
import System from "./system";
import LogisticsSystem from "./systems/logistics";
import ProductionSystem from "./systems/production";

const entityManager = new EntityManager();

const nodeC = new GraphNodeComponent();
const nodeB = new GraphNodeComponent([nodeC]);
const nodeA = new GraphNodeComponent([nodeB]);

entityManager.addEntity(nodeA, new ProducerComponent(), new StoreComponent());
entityManager.addEntity(nodeB, new ConsumerComponent(), new StoreComponent());
entityManager.addEntity(nodeC);

const systems: ReadonlyArray<System> = [
  new LogisticsSystem(entityManager),
  new ProductionSystem(entityManager),
];

setInterval(() => {
  console.log("Update...");
  systems.forEach((s) => s.update());
}, 1000);
