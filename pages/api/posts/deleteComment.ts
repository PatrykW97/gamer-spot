import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res.status(401).json({ message: "Zaloguj się" });
    
    try {
        const commentId = req.body
        const result = await prisma.comment.delete({
            where:{
                id: commentId
            }
        })
      res.status(200).json(result);
    } catch (err) {
        return res.status(403).json({ message : "Something went wrong"})
    }
  }
}

