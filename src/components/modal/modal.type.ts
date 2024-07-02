export type ModalProps = {
  title?: string;
  open: boolean;
  children?: React.ReactNode;
  onHandleClose: () => void;
};
