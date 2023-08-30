import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res.status(401).json({ message: "Please log in!" });
    //add comment
    const prismaUser = await prisma.user.findUnique({
        where: {email: session?.user?.email},
    })
    try {
        const {title, postId} = req.body.data

        if(!title.length){
            return res.status(401).json({message: "Comment empty"})
        }

        const result = await prisma.comment.create({
            data:{
                message: title,
                userId: prismaUser?.id,
                postId,
            }
        })
        res.status(200).json(result)
    } catch (err) {
        return res.status(403).json({ message : "Something went wrong"})
    }
  }
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
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) return res.status(401).json({ message: "Log in" });

    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      return res.status(403).json({ message: "no coś się zjebało byq" });
    }
  }
}

