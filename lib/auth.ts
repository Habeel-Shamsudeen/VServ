import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from '../db'
interface User {
    id: number;
    email: string;
    role: string;
    password: string;
  }

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password", placeholder: "" },
        role: { label: "Role", type: "text", placeholder: "optional" },
      },
      //@ts-ignore
      async authorize(credentials: any) {
        try {
          if (!credentials) throw new Error("Credentials are required");

          const existingUser = await client.user.findFirst({
            where: {
              email: credentials.email,
              role: credentials.role as any,
            },
          }) as User | null;

          if ( existingUser && (credentials.password === existingUser.password)) {
            return {
                id: existingUser.id,
                email: existingUser.email,
                role: existingUser.role,
              };
          }
          return null;
        } catch (error) {
          console.error("Error during authentication", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({
      session,
      token,
    }: any) {
      if (token) {
        session.user = token
      }
      return session;
    },
    async jwt({
      token,
      user,
    }: {
      token: Record<string, any>;
      user?: any;
    }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: `/auth/customer/signin`,
  },
  session: {
    strategy: "jwt",
  },
};

export default authOptions;
