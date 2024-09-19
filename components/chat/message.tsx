import { auth } from '@/auth';
import { IMessageDocument } from '@/models/messageModel';
import React from 'react';
import Sticker from './sticker';

type Props = {
  message: IMessageDocument;
};

async function Message({ message }: Props) {
  const session = await auth();
  const isCurrentUserSender = message?.sender?.toString() === session?.user._id;

  return (
    <>
      <div
        className={`flex ${isCurrentUserSender ? 'flex-row-reverse' : 'flex-row'} ${message.sender === session?.user._id && 'mb-3'}  `}
      >
        <div
          className={`rounded-full ml-2   w-[5px]  ${message.sender.toString() === session?.user._id ? 'bg-blue-400' : 'bg-pink-400'} `}
        ></div>
        <span className="ml-1 text-md">
          {message.messageType === 'text' ? (
            message.content
          ) : (
            <Sticker src={message.content} alt="sticker"></Sticker>
          )}
        </span>
      </div>
    </>
  );
}

export default Message;
