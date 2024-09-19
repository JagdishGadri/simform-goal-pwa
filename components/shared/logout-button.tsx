import { LogOut } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { logoutAction } from '@/lib/actions';

function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button className="bg-black text-white rounded-full p-3 text-xs md:text-sm">
        <LogOut className="cursor-pointer" />
      </Button>
    </form>
  );
}

export default LogoutButton;
