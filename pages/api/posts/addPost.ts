import type { NextApiRequest, NextApiResponse } from "next";
import { getCurrentUser } from "../../../app/session"
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res.status(401).json({ message: "Proszę zaloguj się by stworzyć posta!" });

    const title: string = req.body.title;

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    if (title.length > 300)
      return res.status(403).json({ message: "masz za długiego... posta" });
    if (!title.length) return res.status(403).json({ message : "napisz coś"})

    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
        return res.status(403).json({ message : "no coś się zjebało byq"})
    }
  }
}
