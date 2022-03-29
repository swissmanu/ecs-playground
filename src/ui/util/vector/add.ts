import { Vector2D } from './vector';

export default function add([ax, ay]: Vector2D, [bx, by]: Vector2D): Vector2D {
  return [ax + bx, ay + by];
}
