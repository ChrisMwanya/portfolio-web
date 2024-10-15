import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import LinkedinProvider from 'next-auth/providers/linkedin';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID ?? '',
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID ?? '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET ?? '',
    }),
    LinkedinProvider({
      clientId: process.env.NEXT_PUBLIC_LINKEDIN_ID ?? '',
      clientSecret: process.env.NEXT_PUBLIC_LINKEDIN_SECRET ?? '',
    }),
  ],
});

export { handler as GET, handler as POST };
