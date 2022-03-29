import PositionComponent from '../../../simulation/components/position';
import { Vector2D } from './vector';

export default function positionAsVector(position: PositionComponent): Vector2D {
  return [position.left, position.top];
}
