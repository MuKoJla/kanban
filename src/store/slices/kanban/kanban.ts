import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DraggableId, DraggableLocation } from 'react-beautiful-dnd';

import { AddTaskPayload, EditTaskPayload } from './types';
import { initialState } from './state';

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addBoard: (
      state,
      action: PayloadAction<{
        title: string;
      }>,
    ) => {
      const { title } = action.payload;
      const newBoardId = (Object.keys(state.boards).length + 1).toString();

      state.selectedBoardId = newBoardId;
      state.boards[newBoardId] = {
        boardName: title,
        tasks: {},
        columns: {},
        columnOrder: [],
      };
    },
    switchBoard: (
      state,
      action: PayloadAction<{
        selectedBoardId: string;
      }>,
    ) => {
      const { selectedBoardId } = action.payload;

      state.selectedBoardId = selectedBoardId;
    },
    moveTask: (
      state,
      action: PayloadAction<{
        source: DraggableLocation;
        destination: DraggableLocation;
        draggableId: DraggableId;
      }>,
    ) => {
      const { source, destination, draggableId } = action.payload;
      const { selectedBoardId, boards } = state;
      const selectedBoard = boards[selectedBoardId];

      selectedBoard.columns[source.droppableId].taskIds.splice(source.index, 1);
      selectedBoard.columns[destination.droppableId].taskIds.splice(
        destination.index,
        0,
        draggableId,
      );
    },
    moveColumn: (
      state,
      action: PayloadAction<{
        source: DraggableLocation;
        destination: DraggableLocation;
        draggableId: DraggableId;
      }>,
    ) => {
      const { source, destination, draggableId } = action.payload;
      const { selectedBoardId, boards } = state;
      const selectedBoard = boards[selectedBoardId];

      selectedBoard.columnOrder.splice(source.index, 1);
      selectedBoard.columnOrder.splice(destination.index, 0, draggableId);
    },
    addTask: (state, action: PayloadAction<AddTaskPayload>) => {
      const { title, columnId, description = '' } = action.payload;
      const { selectedBoardId, boards } = state;
      const selectedBoard = boards[selectedBoardId];
      const selectedColumn = selectedBoard.columns[columnId];
      const numberOfTasksInBoard = Object.keys(selectedBoard.tasks).length;
      const newTaskId = `${selectedBoard.boardName}-${selectedColumn.title}-${numberOfTasksInBoard}`;

      selectedBoard.tasks[newTaskId] = {
        id: newTaskId,
        title,
        description,
        status: true,
      };
      selectedColumn.taskIds.push(newTaskId);
    },
    editTask: (state, action: PayloadAction<EditTaskPayload>) => {
      const { selectedBoardId, boards } = state;
      const selectedBoard = boards[selectedBoardId];

      selectedBoard.tasks[action.payload.id] = action.payload;
    },
    editColumn: (state, action: PayloadAction<{ columnId: string; title: string }>) => {
      const { columnId, title } = action.payload;
      const { selectedBoardId, boards } = state;
      const selectedBoard = boards[selectedBoardId];
      const selectedColumn = selectedBoard.columns[columnId];

      selectedColumn.title = title;
    },
    addColumn: (state, action: PayloadAction<{ title: string }>) => {
      const { title } = action.payload;
      const { selectedBoardId, boards } = state;
      const selectedBoard = boards[selectedBoardId];
      const numberOfColumnsInBoard = selectedBoard.columnOrder.length;
      const newColumnId = `${selectedBoard.boardName}-${title}-${numberOfColumnsInBoard}`;

      selectedBoard.columns[newColumnId] = { id: newColumnId, title, taskIds: [] };
      selectedBoard.columnOrder.push(newColumnId);
    },
    deleteColumn: (
      state,
      action: PayloadAction<{ columnId: string; columnOrderIndex: number }>,
    ) => {
      const { columnId, columnOrderIndex } = action.payload;
      const { selectedBoardId, boards } = state;
      const selectedBoard = boards[selectedBoardId];

      delete selectedBoard.columns[columnId];
      selectedBoard.columnOrder.splice(columnOrderIndex, 1);
    },
  },
});

export { kanbanSlice };
