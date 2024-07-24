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

export interface StrokeDistanceFieldProps {
  label: string;
  assistiveTabIndex: number;
  index: number;
  value: string;
  className?: string;
  onChange: (index: number, text: string) => void;
}
