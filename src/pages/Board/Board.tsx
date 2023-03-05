import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { useCurrentBoardSelector } from 'store/slices/kanban/selectors';
import { Draggable } from 'components/Draggable';
import { Droppable } from 'components/Droppable';
import { moveColumn, moveTask } from 'store/slices/kanban';
import { useModal } from 'shared/hooks';
import { Button } from 'components/Button';
import { useCallback } from 'react';

import { DroppableEnum } from '../../shared/types/DroppableEnum';

import { SwitchBoard } from './components/SwitchBoard';
import { Column } from './components/Column';
import { AddColumnModal } from './components/Column/components/AddColumnModal';
import { AddBoardModal } from './components/AddBoardModal';
import styles from './Board.module.scss';

const Board = () => {
  const dispatch = useDispatch();
  const currentBoard = useCurrentBoardSelector();

  const [showAddColumnModal, showAddColumnModalHandler, closeAddColumnModalHandler] = useModal();
  const [showAddBoardModal, showAddBoardModalHandler, closeAddBoardModalHandler] = useModal();

  const onDragEndHandler = useCallback(
    () => (dropResult: DropResult) => {
      const { source, destination, draggableId } = dropResult;
      if (
        !destination ||
        (destination.droppableId === source.droppableId && destination.index === source.index)
      ) {
        return;
      }

      if (dropResult.type === DroppableEnum.Column) {
        dispatch(moveColumn({ source, destination, draggableId }));
      } else if (dropResult.type === DroppableEnum.Task) {
        dispatch(moveTask({ source, destination, draggableId }));
      }
    },
    [],
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Button onClick={showAddBoardModalHandler} className={styles.button}>
          Add new board
        </Button>
        <Button onClick={showAddColumnModalHandler}>Add column</Button>
        <SwitchBoard />
      </div>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable
          className={styles.columns}
          droppableId="all-columns"
          type={DroppableEnum.Column}
          direction="horizontal"
        >
          {currentBoard.columnOrder.map((columnId, index) => {
            const column = currentBoard.columns[columnId];
            const tasks = column.taskIds.map(TaskId => currentBoard.tasks[TaskId]);

            return (
              <Draggable key={columnId} draggableId={columnId} index={index} dragAll={false}>
                <Column column={column} tasks={tasks} columnOrderIndex={index} />
              </Draggable>
            );
          })}
        </Droppable>
      </DragDropContext>

      <AddColumnModal isOpen={showAddColumnModal} onClose={closeAddColumnModalHandler} />
      <AddBoardModal isOpen={showAddBoardModal} onClose={closeAddBoardModalHandler} />
    </div>
  );
};

export { Board };
