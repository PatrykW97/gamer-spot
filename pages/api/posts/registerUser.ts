import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import argon2 from "argon2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, nickname, email, password } = req.body.data;
    console.log(req.body.data);
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { name }],
        },
      });

      if (existingUser) {
        return res.status(400).json({
          error: "Email or username is alredy existing",
        });
      }

      const hashedPassword = await argon2.hash(password);

      const newUser = await prisma.user.create({
        data: {
          nickname,
          name,
          email,
          hashedPassword,
        },
      });

      return res.status(201).json({ message: "Success" });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ error: "Error when registering" });
    }
  } else {
    return res.status(405).json({ error: "Error" });
  }
}
