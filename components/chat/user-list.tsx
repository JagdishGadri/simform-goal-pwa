'use client';

import React, { useCallback, useEffect, useState } from 'react';
import UserCard from './user-card';
import { IUserDocument } from '@/models/userModel';
import { useSearchParams } from 'next/navigation';
import { QueryParams } from '@/types/common';
import { ChatsSkeleton } from '../skeletons/chat-skeleton';
import { debounce } from '@/lib/utils';

function ChatUsersList() {
  const [userList, setUserList] = useState<IUserDocument[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const getUsersList = debounce(
    useCallback(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/users?user=${searchParams.get(QueryParams.USER) ?? ''}`
        );
        const userList = await res.json();
        setUserList(userList);
      } catch (err) {
        throw err;
      } finally {
        setIsLoading(false);
      }
    }, [searchParams]),
    2000
  );

  useEffect(() => {
    getUsersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div>
      {isLoading && !userList ? (
        <ChatsSkeleton />
      ) : (
        userList?.map((user) => {
          return <UserCard key={user._id} userDetails={user} />;
        })
      )}
    </div>
  );
}
export default ChatUsersList;
