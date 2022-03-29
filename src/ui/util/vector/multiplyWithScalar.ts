import { Vector2D } from './vector';

export default function multiplyWithScalar([x, y]: Vector2D, s: number): Vector2D {
  return [x * s, y * s];
}
