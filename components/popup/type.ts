export type PopupProps = {
  title: string;
  description: string;
  showDialog: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};
