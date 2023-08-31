import type { NextApiRequest, NextApiResponse } from "next";
import { getCurrentUser } from "../../../app/session";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) return res.status(401).json({ message: "Log in!" });

    const { title, image, belongsTo } = req.body.data;
    // const image = req.file.path;

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    if (title.length > 300)
      return res.status(403).json({ message: "The post is too long" });
    if (!title.length)
      return res.status(403).json({ message: "Post is empty" });

    try {
      const result = await prisma.post.create({
        data: {
          title,
          image,
          belonging: belongsTo,
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      return res.status(403).json({ message: "Error" });
    }
  }
}
