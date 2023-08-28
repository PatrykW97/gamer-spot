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
    throw new Error("Nieprawidłowy email lub hasło");
  }

  const isValidPassword = await argon2.verify(
    user.hashedPassword ?? "",
    password
  );
  if (!isValidPassword) {
    throw new Error("Nieprawidłowy email lub hasło");
  }

  return { id: user.id, email: user.email, name: user.name}; // Zwracamy rolę użytkownika
};

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error("Brak danych uwierzytelniających");
        }
        return authenticateUser(credentials);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user } ) {
      session.user.id = user.id
      return session;
    },
     async jwt({ token } ) {
       return token
       }
  },
  //  session:{
  //    strategy:"jwt"
  //  }
};
export default NextAuth(authOptions);
