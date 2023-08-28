import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import argon2 from "argon2";


const prisma = new PrismaClient();

const authenticateUser = async (credentials) => {
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

  return { id: user.id, email: user.email, name: user.name}; 
};

export const authOptions = {
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
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authenticateUser(credentials) {
        const { email, password } = credentials;
        console.log("check")
        const user = await prisma.user.findUnique({
          where: { email },
        });
        
        if (!user) {
          throw new Error("Wrong email or password");
        }
      
        const isValidPassword = await argon2.verify(
          user.hashedPassword ?? "",
          password
        );
        if (!isValidPassword) {
          throw new Error("Wrong email or password");
        }
      
        return { id: user.id, email: user.email, name: user.name }; 
      }
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
       //console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        
        }
      }
    },
    jwt: ({ token, user }) => {
       //console.log('JWT Callback', { token, user })
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
