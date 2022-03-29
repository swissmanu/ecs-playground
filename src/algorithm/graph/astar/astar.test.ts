import GraphNodeComponent from '../../../simulation/components/graphNode';
import findPath from './astar';
import djikstraHeuristic from './heuristics/djikstra';

const nodeD = new GraphNodeComponent();
const nodeC = new GraphNodeComponent();
const nodeB = new GraphNodeComponent([
  { target: nodeC, data: 2 },
  { target: nodeD, data: 5 },
]);
const nodeA = new GraphNodeComponent([
  { target: nodeB, data: 1 },
  { target: nodeD, data: 1 },
]);
nodeA.entityId = 'a';
nodeB.entityId = 'b';
nodeC.entityId = 'c';
nodeD.entityId = 'd';

test('foo', () => {
  expect(
    findPath(
      nodeC,
      nodeD,
      ({ edges }) => edges,
      ({ target }) => target,
      (from, { data: weight }) => weight,
      djikstraHeuristic
    )
  ).toEqual([nodeC, nodeB, nodeA, nodeD]);
});
