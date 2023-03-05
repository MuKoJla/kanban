import { FC } from 'react';

import { Button } from '../Button';

import { ModalProps } from './types';
import styles from './Modal.module.scss';

const Modal: FC<ModalProps> = ({ title, onClose, isOpen, children, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <div className={styles.children}>{children}</div>

        <div>
          {!!onClose && <Button title="Close" onClick={onClose} className={styles.close} />}
          <Button title="Save" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export { Modal };
