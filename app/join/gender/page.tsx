/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/atoms';
import { BackButton, HeaderBar } from '@/components/molecules';
import { css, cva } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export interface GenderData {
  gender: 'W' | 'M' | 'N';
}

export interface GenderResponse {
  status: number;
  code: string;
  message: string;
  data: {
    id: number;
    gender: string;
    email: string;
  };
}

export default function JoinPage() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<'W' | 'M' | 'N' | ''>(
    '',
  );

  const handleGenderSelect = (gender: 'W' | 'M' | 'N') => {
    setSelectedGender(gender);
  };

  const onSubmit = async () => {
    if (!selectedGender) return;

    const data: GenderData = { gender: selectedGender };

    try {
      const response = await fetch('/api/join/gender', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error('Failed to update gender');
        return;
      }

      const responseData = (await response.json()) as GenderResponse;

      if (responseData.status === 200) {
        router.push('/join/finish');
      } else {
        console.error('Unexpected response status:', responseData.status);
      }
    } catch (error) {
      console.error('Error updating gender:', error);
    }
  };

  return (
    <div>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <BackButton />
        </HeaderBar.LeftContent>
      </HeaderBar>
      <div className={pageStyles}>
        <div>
          <div className={noticeStyles}>성별을 입력해주세요</div>
          <div className={subNoticeStyles}>맞춤형 기록을 도와드려요!</div>
        </div>

        <div className={buttonsStyles}>
          <div className={genderButtonsStyles}>
            <Button
              className={buttonStyles({
                gender: selectedGender === 'W' ? 'W' : 'default',
              })}
              label="여자"
              size="large"
              onClick={() => handleGenderSelect('W')}
            />
            <Button
              className={buttonStyles({
                gender: selectedGender === 'M' ? 'M' : 'default',
              })}
              label="남자"
              size="large"
              onClick={() => handleGenderSelect('M')}
            />
          </div>
          <div>
            <Button
              className={buttonStyles({
                gender: selectedGender === 'N' ? 'N' : 'default',
              })}
              size="large"
              label="입력하고 싶지 않아요"
              onClick={() => handleGenderSelect('N')}
            />
          </div>
        </div>

        <Button
          buttonType="primary"
          variant="solid"
          label="다음"
          size="large"
          disabled={!selectedGender}
          onClick={onSubmit}
          className={css({ marginTop: '67px' })}
        />
      </div>
    </div>
  );
}

const pageStyles = flex({
  direction: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '20px',
});

const noticeStyles = css({
  textStyle: 'heading4',
  fontWeight: 'bold',
});

const subNoticeStyles = css({
  textStyle: 'label2',
  color: 'text.placeHolder',
});

const buttonsStyles = flex({ direction: 'column', gap: '15px' });

const genderButtonsStyles = flex({
  gap: '10px',
  height: '140px',
  marginTop: '30px',
});

const buttonStyles = cva({
  base: {
    width: 'full',
    height: '100%',
    textStyle: 'heading3',
  },
  variants: {
    gender: {
      W: {
        backgroundColor: 'blue.90',
        color: 'blue.40',
      },
      M: {
        backgroundColor: 'blue.90',
        color: 'blue.40',
      },
      N: {
        backgroundColor: 'blue.90',
        color: 'blue.40',
      },
      default: {
        backgroundColor: 'fill.normal',
        color: 'text.placeHolder',
      },
    },
  },
});
