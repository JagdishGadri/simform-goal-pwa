export const dynamic = 'force-dynamic';

import { auth } from '@/auth';
import { connectToMongoDB } from '@/lib/db';
import User from '@/models/userModel';
import { QueryParams } from '@/types/common';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get(QueryParams.USER) ?? '';
    const session = await auth();
    if (!session) {
      throw new Error('Session not available!');
    }
    const regex = new RegExp(username, 'i');

    await connectToMongoDB();
    const users = await User.find({
      $and: [
        { _id: { $ne: session?.user?._id } },
        {
          $or: [
            { username: { $regex: regex } },
            { fullName: { $regex: regex } }
          ]
        }
      ]
    });

    return Response.json(users);
  } catch (err) {
    throw new Error('Could not get the user list');
  }
}
