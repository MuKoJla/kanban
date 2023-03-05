import { useSelector } from 'react-redux';
import { RootState } from 'store/types';

const useCurrentBoardSelector = () =>
  useSelector(({ kanban }: RootState) => kanban.boards[kanban.selectedBoardId]);

const useBoardOptionsSelector = () =>
  useSelector(({ kanban }: RootState) =>
    Object.entries(kanban.boards).map(([boardId, { boardName }]) => ({
      value: boardId,
      label: boardName,
    })),
  );

const useSelectedBoardOptionSelector = () =>
  useSelector(({ kanban }: RootState) => ({
    value: kanban.selectedBoardId,
    label: kanban.boards[kanban.selectedBoardId].boardName,
  }));

const useTaskSelector = (id = '') =>
  useSelector(({ kanban }: RootState) => kanban.boards[kanban.selectedBoardId]).tasks[id];

export {
  useCurrentBoardSelector,
  useBoardOptionsSelector,
  useSelectedBoardOptionSelector,
  useTaskSelector,
};
