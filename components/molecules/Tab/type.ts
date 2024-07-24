export interface TabItemProps {
  selected: boolean;
  text: string;
  onClick: () => void;
  variant?: 'fill' | 'fit-content';
  type?: 'primary' | 'secondary' | 'assistive';
}

export interface ClickTabItemProps extends TabItemProps {
  onClick: () => void;
}

export interface TabProps {
  variant?: 'fill' | 'fit-content';
  children?: React.ReactNode;
}

export interface TabTypeProps {
  type?: 'primary' | 'secondary' | 'assistive';
}
