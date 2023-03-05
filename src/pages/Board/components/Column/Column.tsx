import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useModal } from 'shared/hooks';
import { Draggable } from 'components/Draggable';
import { Droppable } from 'components/Droppable';
import { deleteColumn } from 'store/slices/kanban';
import { Button } from 'components/Button';

import { AddTaskModal } from '../AddTaskModal';
import { DroppableEnum } from '../../../../shared/types/DroppableEnum';

import { ColumnProps } from './types';
import styles from './Column.module.scss';
import { EditColumnModal } from './components/EditColumnModal';

const Column: FC<ColumnProps> = ({ column, tasks, provided, columnOrderIndex }) => {
  const dispatch = useDispatch();

  const [showAddTaskModal, showAddTaskModalHandler, closeAddTaskModalHandler] = useModal();
  const [showEditColumnModal, showEditColumnModalHandler, closeEditColumnModalHandler] = useModal();

  const deleteColumnHandler = () =>
    dispatch(deleteColumn({ columnId: column.id, columnOrderIndex }));

  return (
    <div className={styles.container}>
      <div {...provided?.dragHandleProps} className={styles.header}>
        <div className={styles.title}>
          <h3>{column.title}</h3>
          <Button onClick={showEditColumnModalHandler} className={styles.edit}>
            &#9998;
          </Button>
        </div>

        <div>
          <Button onClick={showAddTaskModalHandler} className={styles.plus}>
            +
          </Button>
          {!tasks.length && <Button onClick={deleteColumnHandler}>x</Button>}
        </div>
      </div>

      <Droppable droppableId={column.id} type={DroppableEnum.Task} className={styles.taskDrop}>
        {tasks.map((Task, index) => (
          <Draggable draggableId={Task.id} index={index} key={Task.id}>
            <Link to={`/task/${Task.id}`}>
              <div className={styles.task}>{Task.title}</div>
            </Link>
          </Draggable>
        ))}
      </Droppable>
      {!tasks.length && <h5 className={styles.empty}>Empty list, please add some tasks</h5>}

      <AddTaskModal
        columnId={column.id}
        columnTitle={column.title}
        isOpen={showAddTaskModal}
        onClose={closeAddTaskModalHandler}
      />
      <EditColumnModal
        columnId={column.id}
        columnTitle={column.title}
        isOpen={showEditColumnModal}
        onClose={closeEditColumnModalHandler}
      />
    </div>
  );
};

export { Column };
