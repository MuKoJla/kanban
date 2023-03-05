import { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { DefaultModalProps, Modal } from 'components/Modal';
import { addColumn } from 'store/slices/kanban';

const AddColumnModal: FC<DefaultModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
    },
  });

  const onCloseHandler = () => {
    onClose();
    reset();
  };

  const onSubmitHandler = useMemo(
    () =>
      handleSubmit(formData => {
        dispatch(addColumn(formData));
        onCloseHandler();
      }),
    [],
  );

  return (
    <Modal
      title="Add new column"
      onSubmit={onSubmitHandler}
      isOpen={isOpen}
      onClose={onCloseHandler}
    >
      <>
        <input placeholder="Title" {...register('title', { required: true })} />
        {errors.title && <span>This field is required</span>}
      </>
    </Modal>
  );
};

export { AddColumnModal };
