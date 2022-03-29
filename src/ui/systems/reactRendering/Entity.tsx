import React from 'react';
import { ComponentMap } from '../../../simulation/entityManager/entityManager';

interface EntityProps {
  id: string;
  components: ComponentMap;
  cellSize: number;
  onClick?: () => void;
}

const Entity: React.FC<EntityProps> = ({ id, cellSize, onClick }) => {
  const onClickRect = React.useCallback(
    (e: React.MouseEvent) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  return (
    <g transform="scale(0.9,0.9) translate(3,3)">
      <rect width={cellSize} height={cellSize} fill="brown" onClick={onClickRect} />
      <text>{id}</text>
    </g>
  );
};
export default Entity;
