import User from '@/models/userModel';
import { connectToMongoDB } from './db';
import Chat, { IChatDocument } from '@/models/chatModel';
import { auth } from '@/auth';
import { IMessageDocument } from '@/models/messageModel';

export const getChatTimeLineData = async (recipientUserId: string) => {
  try {
    await connectToMongoDB();
    const session = await auth();
    const chats: IChatDocument | null = await Chat.findOne({
      participants: { $all: [session?.user._id, recipientUserId] }
    })
      .populate({
        path: 'messages'
      })
      .sort({ createdAt: 'descending' });

    const recipientUser = await User.findOne({
      _id: recipientUserId
    });

    const groupedMessages = chats?.messages.reduce(
      (acc: Record<string, IMessageDocument[]>, message: IMessageDocument) => {
        const date = new Date(message.createdAt).toISOString().split('T')[0]; // Extract only the date part (YYYY-MM-DD)
        if (!acc?.[date]) {
          acc[date] = [];
        }
        acc[date].push(message);
        return acc;
      },
      {} as Record<string, IMessageDocument[]>
    );

    return {
      messages: groupedMessages,
      recipientUserDetails: recipientUser
    };
  } catch (err) {
    throw err;
  }
};
