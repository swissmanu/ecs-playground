import React from 'react';

interface GridProps {
  numberOfCells: [horizontally: number, vertically: number];
  cellSize: number;
}

const Grid: React.FC<GridProps> = ({ numberOfCells: [horizontally, vertically], cellSize, children }) => {
  const [width, height] = React.useMemo(() => [horizontally * cellSize, vertically * cellSize], []);
  return (
    <svg width={width + 2} height={height + 2}>
      <g transform="translate(1,1)">
        <g>
          {Array.from(new Array(horizontally + 1)).map((_, i) => (
            <line key={i} x1={0} y1={i * cellSize} x2={width} y2={i * cellSize} style={{ stroke: 'lightgray' }} />
          ))}
          {Array.from(new Array(vertically + 1)).map((_, i) => (
            <line key={i} x1={i * cellSize} y1={0} x2={i * cellSize} y2={height} style={{ stroke: 'lightgray' }} />
          ))}
        </g>
        <g>{children}</g>
      </g>
    </svg>
  );
};
export default Grid;
