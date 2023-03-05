import { DraggableProvided } from 'react-beautiful-dnd';
import { Column, Task } from 'store/slices/kanban/types';

interface ColumnProps {
  className?: string;
  column: Column;
  columnOrderIndex: number;
  tasks: Task[];
  provided?: DraggableProvided;
}

export type { ColumnProps };
