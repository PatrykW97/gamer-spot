import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import argon2 from "argon2";
import  Session  from "../../../types/next-auth";

const prisma = new PrismaClient();

const authenticateUser = async (credentials: { email: string, password: string }) => {
  const { email, password } = credentials;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("nie ma uzytkownika");
  }

  const isValidPassword = await argon2.verify(
    user.hashedPassword ?? "",
    password
  );
  if (!isValidPassword) {
    throw new Error("Nieprawidłowy email lub hasło");
  }

  return { id: user.id, email: user.email, name: user.name, image: user.image}; 
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
   session:{
        strategy:"jwt"
      },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error('Brak danych uwierzytelniających');
        }
        return authenticateUser(credentials);
      }
    }),
  ],
  callbacks: {
    session: ({ session, user, token }:{session: any, user:any, token: any}) => {
       console.log('Session Callback', { session, token })
       return {
         ...session,
         user: {
           ...session.user,
           id: token.id,
         }
       }
    },
     jwt: ({ token, user }:{token: any, user: any}) => {
        console.log('JWT Callback', { token, user })
       if (user) {
         const u = user
         return {
           ...token,
           id: u.id,
          
         }
       }
       return token
     }
    
  },
  
  
};
export default NextAuth(authOptions);
