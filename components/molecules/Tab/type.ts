export type TabItemProps = {
  selected: boolean;
  text: string;
  onClick: () => void;
  variant?: 'fill' | 'fit-content';
  type?: 'primary' | 'secondary' | 'assistive';
};

export interface ClickTabItemProps extends TabItemProps {
  onClick: () => void;
}

export type TabProps = {
  variant?: 'fill' | 'fit-content';
  children?: React.ReactNode;
  addStyles?: object;
};

export type TabTypeProps = {
  type?: 'primary' | 'secondary' | 'assistive';
};
