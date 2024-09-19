'use client';
import { IUserDocument } from '@/models/userModel';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useRouter } from 'next/navigation';

function UserCard({ userDetails }: { userDetails: IUserDocument }) {
  const router = useRouter();
  return (
    <div
      className={`flex items-center gap-2 border-b border-b-sigColorBgBorder p-1 hover:bg-sigBackgroundFeedHover cursor-pointer `}
      onClick={() => {
        router.push(`/chat/${userDetails._id}`);
      }}
    >
      <Avatar className="cursor-pointer hover:bg-sigBackgroundSecondaryHover">
        <AvatarImage src={userDetails.avatar} />
      </Avatar>
      <span>{userDetails?.fullName}</span>
    </div>
  );
}
export default UserCard;
