import { kanbanSlice } from './kanban';

const {
  actions: {
    moveTask,
    moveColumn,
    addTask,
    editColumn,
    deleteColumn,
    addColumn,
    addBoard,
    switchBoard,
    editTask,
  },
  reducer: kanbanReducer,
} = kanbanSlice;

export {
  moveTask,
  moveColumn,
  addTask,
  editColumn,
  deleteColumn,
  addColumn,
  addBoard,
  editTask,
  switchBoard,
  kanbanReducer,
};
