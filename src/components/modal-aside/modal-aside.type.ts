export type ModalAsideProps = {
  id: string;
  header?: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  open: boolean;
  className?: string;
  position?: ModalAsidePositionType;
  contentPadding?: boolean;
  onClose: () => void;
};

export type ModalAsidePositionType = 'left' | 'right';
