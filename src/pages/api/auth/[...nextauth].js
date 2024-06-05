// [...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectPostgres } from "../../../../database/conn"; // Ensure this path is correct
import User from "../../../../model/User"; // Ensure this path is correct

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectPostgres();
        const user = await User.findOne({ where: { email: credentials.email } });
        if (!user) {
          throw new Error('Invalid email or password');
        }
        const isValid = await user.comparePassword(credentials.password);
        if (!isValid) {
          throw new Error('Invalid email or password');
        }
        return { id: user.id, name: user.username, email: user.email };
      }
    })
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  },
  pages: {
    signIn: "/LoginForm", // Custom sign-in page
  },
  debug: true,
});
