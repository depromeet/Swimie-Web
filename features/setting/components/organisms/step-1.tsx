import { titleStyles } from '@/app/delete-account/page';

import ListItem from '../atom/list-item';

interface Step1Props {
  onListItemClick: () => void;
}

export default function Step1({ onListItemClick }: Step1Props) {
  return (
    <div>
      <div className={titleStyles}>탈퇴하는 이유가 무엇인가요?</div>
      <ListItem text="더이상 수영을 하지 않아요" onClick={onListItemClick} />
      <ListItem text="오류가 생겨서 쓸 수 없어요" onClick={onListItemClick} />
      <ListItem text="개인정보가 불안해요" onClick={onListItemClick} />
      <ListItem text="앱 사용법을 모르겠어요" onClick={onListItemClick} />
      <ListItem text="기타" onClick={onListItemClick} />
    </div>
  );
}
