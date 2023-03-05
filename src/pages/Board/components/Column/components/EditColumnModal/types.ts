import { DefaultModalProps } from 'components/Modal';

interface EditColumnModalProps extends DefaultModalProps {
  columnTitle: string;
  columnId: string;
}

export type { EditColumnModalProps };
