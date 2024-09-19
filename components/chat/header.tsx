'use client';
import { IUserDocument } from '@/models/userModel';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';

type Props = { userDetails: IUserDocument };

function Header({ userDetails }: Props) {
  return (
    <div className="flex items-center bg-sigSurface rounded-full mb-2 w-full">
      <Avatar className="cursor-pointer hover:bg-sigBackgroundSecondaryHover">
        <AvatarImage
          src={userDetails?.avatar ?? '/logo.png'}
          height={'50px'}
          width={'50px'}
        />
      </Avatar>
      <span className="text-xl">{userDetails?.fullName ?? 'User Name'}</span>
    </div>
  );
}

export default Header;
