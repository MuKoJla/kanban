import { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Modal } from 'components/Modal';
import { addTask } from 'store/slices/kanban';

import { AddTaskModalProps } from './types';

const AddTaskModal: FC<AddTaskModalProps> = ({ columnTitle, columnId, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onCloseHandler = () => {
    onClose();
    reset();
  };

  const onSubmitHandler = useMemo(
    () =>
      handleSubmit(formData => {
        dispatch(addTask({ ...formData, columnId }));
        onCloseHandler();
      }),
    [columnId],
  );

  return (
    <Modal
      title={`Create new task in ${columnTitle}`}
      onSubmit={onSubmitHandler}
      isOpen={isOpen}
      onClose={onCloseHandler}
    >
      <>
        <input placeholder="Title" {...register('title', { required: true })} />
        {errors.title && <span>This field is required</span>}

        <input placeholder="Description" {...register('description')} />
      </>
    </Modal>
  );
};

export { AddTaskModal };
