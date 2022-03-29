import { Vector2D } from './vector';

export default function asSVGTranslate([x, y]: Vector2D): string {
  return `translate(${x}, ${y})`;
}
