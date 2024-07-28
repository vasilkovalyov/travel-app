export type ModalProps = {
  open: boolean;
  children?: React.ReactNode;
  className?: string;
  size?: 'small' | 'default';
  onClose: () => void;
};
