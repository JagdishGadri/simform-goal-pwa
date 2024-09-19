'use server';

import { auth, signIn, signOut } from '@/auth';
import { connectToMongoDB } from './db';
import Chat, { IChatDocument } from '@/models/chatModel';
import Message, { IMessageDocument } from '@/models/messageModel';
import { revalidatePath } from 'next/cache';

export async function authAction() {
  await signIn('github');
}

export async function logoutAction() {
  await signOut();
}

export default async function revalidateChatTimeLine(recipientId: string) {
  revalidatePath(`/chat/${recipientId}`, 'page');
}

export const sendMessageAction = async (
  receiverId: string,
  content: string,
  messageType: 'image' | 'text'
) => {
  try {
    //sender id
    const session = await auth();
    if (!session) return;
    await connectToMongoDB();
    const senderId = session.user._id;

    const newMessage: IMessageDocument = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
      messageType
    });

    let chat: IChatDocument | null = await Chat.findOne({
      participants: { $all: [senderId, receiverId] }
    });
    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id]
      });
    } else {
      chat.messages.push(newMessage._id);
      await chat.save();
    }

    // revalidate  the path when new message is sent
    revalidatePath(`/chat/${receiverId}`);
  } catch (err) {
    throw err;
  }
};
