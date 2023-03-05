import { DroppableProps as DroppablePropsBase } from 'react-beautiful-dnd';
import { ReactNode } from 'react';

interface DroppableProps extends Omit<DroppablePropsBase, 'children'> {
  children: ReactNode;
  className?: string;
}

export type { DroppableProps };
