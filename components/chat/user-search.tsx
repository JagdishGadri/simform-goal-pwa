'use client';
import { QueryParams } from '@/types/common';
import { SearchIcon } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';

function UserSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const searchHandler = (value: string = '') => {
    router.push(pathname + '?' + createQueryString(QueryParams.USER, value));
  };

  return (
    <div className="p-4">
      <div className=" text-gray-400 p-1  flex gap-2 rounded-full bg-sigSurface border border-sigColorBgBorder">
        <SearchIcon className="text-gray-400 w-5" />
        <input
          className="bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
          placeholder="Search"
          type="text"
          onChange={(e) => {
            searchHandler(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default UserSearch;
