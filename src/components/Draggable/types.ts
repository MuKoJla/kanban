import { DraggableProps as DraggablePropsBase, DraggableProvided } from 'react-beautiful-dnd';
import { ReactElement } from 'react';

import { Column, Task } from '../../store/slices/kanban/types';

interface DraggableProps extends Omit<DraggablePropsBase, 'children'> {
  className?: string;
  children: ReactElement<{
    className?: Column;
    column: Column;
    tasks: Task[];
    provided?: DraggableProvided;
  }>;
  dragAll?: boolean;
}

export type { DraggableProps };
