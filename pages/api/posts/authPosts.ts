import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res
        .status(401)
        .json({ message: "Proszę zaloguj się by stworzyć posta!" });
    //getting users posts
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
        include: {
          Post: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              Comment: {
                orderBy: {
                  createdAt: "desc"
                },
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });
      res.status(200).json(data);
    } catch (err) {
      return res.status(403).json({ message: "no coś się zjebało byq" });
    }
  }
}
