import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { editTask } from 'store/slices/kanban';
import { Modal } from 'components/Modal';
import { useTaskSelector } from 'store/slices/kanban/selectors';

import styles from './Tak.module.scss';

const Task = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const selectedTask = useTaskSelector(taskId);
  const isTaskDefined = !!selectedTask;
  const { title, description, status, id = '' } = selectedTask ?? {};

  const goBack = () => navigate(-1);

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title,
      description,
      status: status ? 'open' : 'closed',
    },
  });

  useEffect(() => {
    if (!isTaskDefined) {
      navigate('/404');
    }
  }, []);

  const onSubmitHandler = useMemo(
    () =>
      handleSubmit(formData => {
        dispatch(editTask({ ...formData, id, status: formData.status === 'open' }));
        goBack();
      }),
    [],
  );

  return (
    <Modal title="Edit task" onSubmit={onSubmitHandler} isOpen={isTaskDefined}>
      <>
        <input placeholder="Title" {...register('title', { required: true })} />
        {errors.title && <span>This field is required</span>}

        <h3 className={styles.status}>Status</h3>
        <label htmlFor="open">
          <input {...register('status')} type="radio" value="open" id="open" />
          Open
        </label>
        <label htmlFor="closed">
          <input {...register('status')} type="radio" value="closed" id="closed" />
          Closed
        </label>

        <input
          placeholder="Description"
          {...register('description')}
          className={styles.description}
        />
      </>
    </Modal>
  );
};

export { Task };
