import ConsumerComponent from '../simulation/components/consumer';
import GraphNodeComponent from '../simulation/components/graphNode';
import PositionComponent from '../simulation/components/position';
import ProducerComponent from '../simulation/components/producer';
import StoreComponent from '../simulation/components/store';
import WalkerComponent from '../simulation/components/walker';
import EntityManager from '../simulation/entityManager';
import System from '../simulation/system';
import LogisticsSystem from '../simulation/systems/logistics';
import ProductionSystem from '../simulation/systems/production';
import ReactRenderingSystem from './systems/reactRendering';

function createSimulation() {
  const entityManager = new EntityManager();

  const nodeD = new GraphNodeComponent();
  const nodeC = new GraphNodeComponent();
  const nodeB = new GraphNodeComponent([
    { target: nodeC, data: 2 },
    { target: nodeD, data: 3 },
  ]);
  const nodeA = new GraphNodeComponent([
    { target: nodeB, data: 5 },
    { target: nodeD, data: 1 },
  ]);

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
   │      │      │      │      │┌────┐│      │      │
 2 │      │      │      │      ││ D  ││      │      │
   │      │      │      │      │└────┘│      │      │
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

  const entityA = entityManager.addEntity(
    nodeA,
    new ProducerComponent(0.5),
    new StoreComponent(),
    new PositionComponent(1, 1)
  );
  const entityB = entityManager.addEntity(nodeB, new PositionComponent(1, 3));
  const entityC = entityManager.addEntity(
    nodeC,
    new ConsumerComponent(),
    new StoreComponent(),
    new PositionComponent(5, 4)
  );
  const entityD = entityManager.addEntity(nodeD, new PositionComponent(4, 2));

  entityManager.addEntity(
    new WalkerComponent(
      {
        type: 'Idle',
        location: entityManager.getEntityWithComponents(entityC, 'GraphNode')!.GraphNode,
      },
      2
    )
  );

  const systems: ReadonlyArray<System> = [new LogisticsSystem(entityManager), new ProductionSystem(entityManager)];

  return {
    entityManager,
    systems,
  };
}

const ui = document.querySelector('#ui');

if (ui) {
  let handle: number | null = null;
  const onSimulateOneTick = () => {
    if (handle === null) {
      systems.forEach((s) => s.update());
    }
  };

  const onToggleSimulation = () => {
    // Do this state as part of the entitymanager as well?
    if (handle === null) {
      handle = window.setInterval(() => {
        systems.forEach((s) => s.update());
      }, 750);
    } else {
      clearInterval(handle);
      handle = null;
    }
  };

  const { entityManager, systems: simulationSystems } = createSimulation();
  const reactRendering = new ReactRenderingSystem(entityManager, ui, onSimulateOneTick, onToggleSimulation);
  const systems = [...simulationSystems, reactRendering];

  reactRendering.update();
}
