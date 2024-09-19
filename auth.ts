import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { connectToMongoDB } from './lib/db';
import User from './models/userModel';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    })
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session }) {
      try {
        await connectToMongoDB();
        if (session.user) {
          const currentLoggedInUser = await User.findOne({
            email: session?.user?.email
          });
          if (currentLoggedInUser) {
            session.user._id = currentLoggedInUser?._id;
            return session;
          } else {
            throw new Error('User not found in db');
          }
        } else {
          throw new Error('Invalid Session');
        }
      } catch (error) {
        console.log(error);
        throw new Error('Invalid Session');
      }
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        // token.id = profile?.id;
      }
      return token;
    },
    async signIn({ account, profile }) {
      if (account?.provider === 'github') {
        await connectToMongoDB();

        try {
          const user = await User.findOne({ email: profile?.email });
          // signup the user if not found
          if (!user) {
            const newUser = await User.create({
              username: profile?.login,
              email: profile?.email,
              fullName: profile?.name,
              avatar: profile?.avatar_url
            });

            await newUser.save();
          }
          return true; // indicate successful sign-in
        } catch (error) {
          console.log(error);
          return false; // indicate failed sign-in
        }
      }

      return false; // indicate failed sign-in
    }
  }
});
