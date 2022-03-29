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

  const nodeC = new GraphNodeComponent();
  const nodeB = new GraphNodeComponent([{ target: nodeC, data: 2 }]);
  const nodeA = new GraphNodeComponent([{ target: nodeB, data: 1 }]);

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

  const entityA = entityManager.addEntity(
    nodeA,
    new ProducerComponent(0.5),
    new StoreComponent(),
    new PositionComponent(1, 1)
  );
  const entityB = entityManager.addEntity(nodeB, new PositionComponent(1, 3));
  const entityC = entityManager.addEntity(nodeC, new StoreComponent(), new PositionComponent(5, 4));

  entityManager.addEntity(
    new WalkerComponent({
      type: 'Moving',
      path: [
        entityManager.getEntityWithComponents(entityC, 'Position', 'GraphNode')!,
        entityManager.getEntityWithComponents(entityB, 'Position', 'GraphNode')!,
        entityManager.getEntityWithComponents(entityA, 'Position', 'GraphNode')!,
      ],
      currentPathSegment: 0,
      segmentProgress: 0,
    })
  );

  const systems: ReadonlyArray<System> = [new LogisticsSystem(entityManager), new ProductionSystem(entityManager)];

  return {
    entityManager,
    systems,
  };
}

const ui = document.querySelector('#ui');

if (ui) {
  const { entityManager, systems: simulationSystems } = createSimulation();
  const reactRendering = new ReactRenderingSystem(entityManager, ui);
  const systems = [...simulationSystems, reactRendering];

  reactRendering.update();
  setInterval(() => {
    console.log('Update...');
    systems.forEach((s) => s.update());
  }, 750);
}
