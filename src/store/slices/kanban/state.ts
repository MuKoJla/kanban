import { KanbanState } from './types';

export const initialState: KanbanState = {
  selectedBoardId: '1',
  boards: {
    first: {
      boardName: 'First Board',
      tasks: {
        task1: { id: 'task1', title: 'task title1', description: 'desc', status: true },
        task2: { id: 'task2', title: 'task title2', description: 'desc', status: true },
        task3: { id: 'task3', title: 'task title3', description: 'desc', status: true },
        task4: { id: 'task4', title: 'task title4', description: 'desc', status: true },
      },
      columns: {
        column1: {
          id: 'column1',
          title: 'To do',
          taskIds: ['task1', 'task2', 'task3'],
        },
        column2: {
          id: 'column-2',
          title: 'In progress',
          taskIds: ['task4'],
        },
        column3: {
          id: 'column-3',
          title: 'Done',
          taskIds: [],
        },
      },
      columnOrder: ['column1', 'column2', 'column3'],
    },
  },
};
