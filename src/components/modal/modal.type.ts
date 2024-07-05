export type ModalProps = {
  title?: string | null;
  open: boolean;
  children?: React.ReactNode;
  headerContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  className?: string;
  onHandleClose: () => void;
};
