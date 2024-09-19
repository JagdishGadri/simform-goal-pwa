'use client';
// eslint-disable-next-line import/named
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { authAction } from '@/lib/actions';

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full flex gap-2" disabled={pending}>
      <Image src="/github.svg" width={20} height={20} alt="Github logo" /> Log
      in with Github
    </Button>
  );
}

export default function LoginCard() {
  const [errorMessage, dispatch] = useFormState(authAction, null);

  return (
    <>
      <form className="space-y-4" action={dispatch}>
        <LoginButton />
      </form>
      <div className="mt-4 text-center text-[13px]">
        <span>New To SnapNext? </span>
        <Link
          className="text-blue-500 hover:underline text-[13px] mr-1"
          href="/signup"
        >
          Sign Up
        </Link>
        {errorMessage ? (
          <p className="text-sm text-red-500">{errorMessage}</p>
        ) : null}
      </div>
    </>
  );
}
