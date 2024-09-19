'use client';
import React, { useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { SmilePlus } from 'lucide-react';
import revalidateChatTimeLine, { sendMessageAction } from '@/lib/actions';
import Sticker from './sticker';
import { scrollToEnd } from '@/lib/utils';
import { useWebSocket } from '@/contexts/WebSocketContext';

const emojis = [
  { src: '/emojis/like.gif', alt: 'Like' },
  { src: '/emojis/dislike.gif', alt: 'Dislike' },
  { src: '/emojis/mind-blown.gif', alt: 'Mind Blown' },
  { src: '/emojis/laugh.gif', alt: 'Laugh' },
  { src: '/emojis/fire.gif', alt: 'Fire' },
  { src: '/emojis/question.gif', alt: 'Question' },
  { src: '/emojis/love.gif', alt: 'Love' }
];

function StickerPopover({
  receiverId,
  senderId
}: {
  receiverId: string;
  senderId: string;
}) {
  const { socket, messages } = useWebSocket();
  useEffect(() => {
    if (messages) {
      revalidateChatTimeLine(messages?.[messages?.length - 1]?.receiverId);
    }
  }, [messages]);
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <SmilePlus />
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-sigMain border border-sigColorBgBorder">
          <div className="flex gap-4 flex-wrap items-center">
            {emojis.map((emoji) => (
              <Sticker
                key={emoji.src}
                {...emoji}
                onClick={async () => {
                  try {
                    await sendMessageAction(
                      receiverId,
                      emoji.src ?? '',
                      'image'
                    );
                    scrollToEnd('message-container');
                    if (socket) {
                      // not the actual image but just to trigger refetch in receiver's UI
                      socket.send(
                        JSON.stringify({
                          type: 'message',
                          senderId: senderId,
                          recepientId: receiverId,
                          content: 'new-image'
                        })
                      );
                    }
                  } catch (err) {
                    throw err;
                  }
                }}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default StickerPopover;
