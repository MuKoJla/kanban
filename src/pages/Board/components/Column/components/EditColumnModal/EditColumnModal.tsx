import { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Modal } from 'components/Modal';
import { editColumn } from 'store/slices/kanban';

import { EditColumnModalProps } from './types';

const EditColumnModal: FC<EditColumnModalProps> = ({ columnTitle, columnId, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: columnTitle,
    },
  });

  const onSubmitHandler = useMemo(
    () =>
      handleSubmit(formData => {
        dispatch(editColumn({ ...formData, columnId }));
        onClose();
      }),
    [columnId],
  );

  return (
    <Modal title="Edit column name" onSubmit={onSubmitHandler} isOpen={isOpen} onClose={onClose}>
      <>
        <input placeholder="Title" {...register('title', { required: true })} />
        {errors.title && <span>This field is required</span>}
      </>
    </Modal>
  );
};

export { EditColumnModal };
