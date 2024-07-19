export type ModalProps = {
  open: boolean;
  children?: React.ReactNode;
  className?: string;
  onClose: () => void;
};
