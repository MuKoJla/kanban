import { FC, cloneElement, isValidElement } from 'react';
import { Draggable as DraggableBase } from 'react-beautiful-dnd';

import { DraggableProps } from './types';

const Draggable: FC<DraggableProps> = ({ className, children, dragAll = true, ...props }) => {
  if (!isValidElement(children)) {
    return null;
  }

  return (
    <DraggableBase {...props}>
      {provided => (
        <div
          className={className}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...(dragAll && { ...provided.dragHandleProps })}
        >
          {cloneElement(children, { provided })}
        </div>
      )}
    </DraggableBase>
  );
};

export { Draggable };
