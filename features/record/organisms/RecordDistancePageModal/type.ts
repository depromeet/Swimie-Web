export interface RecordDistancePageModalProps {
  isOpen: boolean;
  jumpDirection: 'forward' | 'backward';
  closePageModal?: () => void;
}

export interface RecordSwimFieldProps {
  label: string;
  assistiveTabIndex: number;
  addStyles?: object;
}

export interface AddFieldProps {
  text: string;
  onClick?: () => void;
}
