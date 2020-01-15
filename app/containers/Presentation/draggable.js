import React, { useState } from 'react';
import Draggable from 'react-draggable';

export default function DragComponent() {
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;

    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  return (
    <div>
      <Draggable bounds="body" onDrag={handleDrag}>
        <div className="box">
          <div>I track my deltas</div>
          <div>
            x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}
          </div>
        </div>
      </Draggable>
    </div>
  );
}
