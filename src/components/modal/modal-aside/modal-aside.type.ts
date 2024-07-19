export type ModalAsideProps = {
  id: string;
  title?: string;
  children: React.ReactNode;
  open: boolean;
  className?: string;
  position?: ModalAsidePositionType;
  onClose: () => void;
};

export type ModalAsidePositionType = 'left' | 'right';
