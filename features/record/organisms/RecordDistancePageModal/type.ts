export interface RecordDistancePageModalProps {
  currentLane: number;
  modifyTotalMeters: (totalMeters: number) => void;
  modifyTotalLaps: (totalLaps: number) => void;
  modifyStrokes: (
    strokes: {
      name: string;
      laps: number;
      meter: number;
    }[],
  ) => void;
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
