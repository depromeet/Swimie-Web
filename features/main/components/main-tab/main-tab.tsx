import { Tab, TabItem } from '@/components/molecules';

export interface TabItemInfo {
  text: string;
  selected: boolean;
  onClick: VoidFunction;
}

interface MainTabProps {
  tabInfos: Array<TabItemInfo>;
}

export const MainTab = ({ tabInfos }: MainTabProps) => {
  return (
    <Tab>
      {tabInfos.map((info, index) => (
        <TabItem key={index} {...info} />
      ))}
    </Tab>
  );
};
