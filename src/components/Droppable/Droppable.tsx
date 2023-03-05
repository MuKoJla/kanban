import { FC } from 'react';
import { Droppable as DroppableBase } from 'react-beautiful-dnd';
import classNames from 'classnames';

import { DroppableProps } from './types';
import styles from './Droppable.module.scss';

const Droppable: FC<DroppableProps> = ({ children, className, ...props }) => (
  <DroppableBase {...props}>
    {(provided, snapshot) => (
      <div
        {...provided.innerRef}
        ref={provided.innerRef}
        className={classNames(className, styles.base, {
          [styles.content]: snapshot.isDraggingOver,
        })}
      >
        {children}
        {provided.placeholder}
      </div>
    )}
  </DroppableBase>
);

export { Droppable };
