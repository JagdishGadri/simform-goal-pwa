import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's unique id. */
      _id: string;
    } & DefaultSession['user'];
  }
}

// declare module 'next-auth/session' {
//   interface Session {
//     user: {
//       /** The user's unique id. */
//       _id: string;
//     } & DefaultSession['user'];
//   }
// }
