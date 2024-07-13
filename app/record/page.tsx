import { HeaderBar } from '@/components/atoms';

export default function RecordPage() {
  return (
    <main>
      <HeaderBar>
        <h1>수영 기록하기</h1>
      </HeaderBar>
    </main>
  );
}

// 'use client';

// import { TextInput } from '@/components/atoms';
// import { css } from '@/styled-system/css';

// interface RecordFormProps {
//   styles?: object;
// }

// export default function RecordForm({ styles }: RecordFormProps) {
//   const abc = (text: string) => {
//     console.log(text);
//   };
//   return (
//     <form className={css(recordFormStyles, styles)}>
//       <TextInput placeholder="거리입력(선택)" maxLength={10} onChange={abc} />
//     </form>
//   );
// }

// const recordFormStyles = css.raw({
//   padding: '0px 20px',
// });
