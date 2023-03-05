import { DefaultModalProps } from 'components/Modal';

interface AddTaskModalProps extends DefaultModalProps {
  columnTitle: string;
  columnId: string;
}

export type { AddTaskModalProps };
