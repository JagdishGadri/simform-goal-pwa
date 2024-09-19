import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { WebSocketProvider } from '@/contexts/WebSocketContext';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PWA: Know Snap',
  description: 'Chat with your programming buddies'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <WebSocketProvider senderId={session?.user?._id}>
          {children}
        </WebSocketProvider>
      </body>
    </html>
  );
}
