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

    if (!session) return res.status(401).json({ message: "Log in" });

    try {
      const data = await prisma.friendship.findMany({
        where: {
          OR: [{ userAId: session?.user?.id }, { userBId: session?.user?.id }],
          isConfirmed: false,
        },
        include: {
          userA: true,
          userB: true,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      return res.status(403).json({ message: "Error" });
    }
  }

  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);
    const friendshipId: string = req.body.friendshipId;

    try {
      const result = await prisma.friendship.update({
        where: {
          id: friendshipId,
        },
        data: {
          isConfirmed: true,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      return res.status(403).json({ message: "Error" });
    }
  }
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    const friendshipId: string = req.body;

    try {
      const result = await prisma.friendship.delete({
        where: {
          id: friendshipId,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      return res.status(403).json({ message: "Error" });
    }
  }
}
