import { EmptyObject } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: boolean;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface AddTaskPayload {
  title: string;
  columnId: string;
  description: string;
}

export interface EditTaskPayload extends Omit<AddTaskPayload, 'columnId'> {
  id: string;
  status: boolean;
}

export interface KanbanState {
  selectedBoardId: string;
  boards: Record<
    string,
    {
      boardName: string;
      tasks: Record<string, Task>;
      columns: Record<string, Column>;
      columnOrder: string[];
    }
  >;
}

export interface KanbanRootsState extends EmptyObject {
  kanban: KanbanState;
}
