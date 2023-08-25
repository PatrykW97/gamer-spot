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
            OR:[
           {userAId: session?.user?.id},
           {userBId: session?.user?.id}
            ]
        },include:{
            userA: true,
            userB: true
             
        }
      });
      res.status(200).json(data);
    } catch (err) {
      return res.status(403).json({ message: "no coś się zjebało byq" });
    }
  }
}
