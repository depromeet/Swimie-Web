'use client';

import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { SearchBar } from '@/components/molecules';
import { css } from '@/styled-system/css';

export const SearchBarSection = ({ keyword }: { keyword: string }) => {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState<string>(keyword);

  const handleChangeKeyword = debounce((keyword: string) => {
    setSearchKeyword(keyword);
  }, 400);

  const setKeywordParams = useCallback(
    (keyword: string) => {
      const params = new URL(window.location.href);
      params.searchParams.set('keyword', keyword);

      router.replace(params.toString());
    },
    [router],
  );

  useEffect(() => {
    setKeywordParams(searchKeyword);
  }, [searchKeyword, setKeywordParams]);

  return (
    <div className={containerStyle}>
      <SearchBar
        value={searchKeyword}
        placeholder="유저 검색"
        onChange={handleChangeKeyword}
      />
    </div>
  );
};

const containerStyle = css({
  p: '8px 20px',
});
