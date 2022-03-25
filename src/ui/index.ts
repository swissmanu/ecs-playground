import GraphNodeComponent from '../simulation/components/graphNode';
import PositionComponent from '../simulation/components/position';
import ProducerComponent from '../simulation/components/producer';
import StoreComponent from '../simulation/components/store';
import EntityManager from '../simulation/entityManager';
import System from '../simulation/system';
import LogisticsSystem from '../simulation/systems/logistics';
import ProductionSystem from '../simulation/systems/production';
import ReactRenderingSystem from './systems/reactRendering';

function createSimulation() {
  const entityManager = new EntityManager();

  const nodeC = new GraphNodeComponent();
  const nodeB = new GraphNodeComponent([nodeC]);
  const nodeA = new GraphNodeComponent([nodeB]);

  /*
       0     1      2      3       4      5     6
   ┌──────┬──────┬──────┬──────┬──────┬──────┬──────┐
   │      │      │      │      │      │      │      │
 0 │      │      │      │      │      │      │      │
   │      │      │      │      │      │      │      │
   ├──────┼──────┼──────┼──────┼──────┼──────┼──────┤
   │      │┌────┐│      │      │      │      │      │
 1 │      ││ A  ││      │      │      │      │      │
   │      │└────┘│      │      │      │      │      │
   ├──────┼──────┼──────┼──────┼──────┼──────┼──────┤
   │      │      │      │      │      │      │      │
 2 │      │      │      │      │      │      │      │
   │      │      │      │      │      │      │      │
   ├──────┼──────┼──────┼──────┼──────┼──────┼──────┤
   │      │┌────┐│      │      │      │      │      │
 3 │      ││ B  ││      │      │      │      │      │
   │      │└────┘│      │      │      │      │      │
   ├──────┼──────┼──────┼──────┼──────┼──────┼──────┤
   │      │      │      │      │      │┌────┐│      │
 4 │      │      │      │      │      ││ C  ││      │
   │      │      │      │      │      │└────┘│      │
   ├──────┼──────┼──────┼──────┼──────┼──────┼──────┤
   │      │      │      │      │      │      │      │
 5 │      │      │      │      │      │      │      │
   │      │      │      │      │      │      │      │
   └──────┴──────┴──────┴──────┴──────┴──────┴──────┘
*/

  entityManager.addEntity(nodeA, new ProducerComponent(0.5), new StoreComponent(), new PositionComponent(1, 1));
  entityManager.addEntity(nodeB, new StoreComponent(), new PositionComponent(1, 3));
  entityManager.addEntity(nodeC, new StoreComponent(), new PositionComponent(5, 4));

  const systems: ReadonlyArray<System> = [new LogisticsSystem(entityManager), new ProductionSystem(entityManager)];

  return {
    entityManager,
    systems,
  };
}

const ui = document.querySelector('#ui');

if (ui) {
  const { entityManager, systems: simulationSystems } = createSimulation();
  const systems = [...simulationSystems, new ReactRenderingSystem(entityManager, ui)];

  setInterval(() => {
    console.log('Update...');
    systems.forEach((s) => s.update());
  }, 1000);
}
