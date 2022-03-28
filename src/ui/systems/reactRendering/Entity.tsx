import React from 'react';
import { ComponentMap } from '../../../simulation/entityManager/entityManager';

interface EntityProps {
  id: string;
  components: ComponentMap;
  cellSize: number;
}

const Entity: React.FC<EntityProps> = ({ id, cellSize }) => {
  return (
    <g transform="scale(0.9,0.9) translate(3,3)">
      <rect width={cellSize} height={cellSize} fill="brown" />
      <text>{id}</text>
    </g>
  );
};
export default Entity;
