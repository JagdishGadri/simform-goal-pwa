import Image from 'next/image';
import LogoutButton from '@/components/shared/logout-button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { auth } from '@/auth';
import ChatUserList from './user-list';
import heroPng from '@/public/hero.png';
import UserSearch from './user-search';

async function ChatSideBar() {
  const session = await auth();

  return (
    <aside className="flex-[1_1_0%] flex flex-col bg-black text-white">
      <div className="sticky top-0 bg-black z-50">
        <div className="flex items-center justify-between p-4 border-b border-gray-800 ">
          <div className="relative">
            <Avatar className="cursor-pointer hover:bg-sigBackgroundSecondaryHover">
              {session?.user?.image ? (
                <AvatarImage src={session.user.image} />
              ) : (
                <AvatarImage src={heroPng.src} />
              )}
            </Avatar>
          </div>
          <Button className="bg-sigButton hover:bg-sigButtonHover text-white rounded-full h-8 w-8 relative p-2">
            <Image src="/chat.svg" fill alt="Chat icon" />
          </Button>
          <LogoutButton />
        </div>
      </div>
      <UserSearch />
      <ChatUserList />
    </aside>
  );
}
export default ChatSideBar;
