import { ReactNode } from 'react';

interface ModalProps {
  title: string;
  onClose?: () => void;
  onSubmit: () => void;
  submitTitle?: string;
  isOpen: boolean;
  children: ReactNode;
}

interface DefaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type { ModalProps, DefaultModalProps };
