type CreateProps = {
  onClose: () => void;
  isOpen: boolean;
};
type IFrame = {
  Identification: string | undefined;
  id: number;
  Firstname: string;
  Lastname: string;
};

export type { CreateProps, IFrame };
