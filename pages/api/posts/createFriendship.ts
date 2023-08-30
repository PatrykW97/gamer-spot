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

    console.log(req.body.userBId)
    console.log(session?.user.id)
    const userBId: string = req.body.userBId;
    
     try {
      const result = await prisma.friendship.create({
        data: {
           userAId: session?.user.id,
           userBId: userBId
         },
       });
       res.status(200).json(result);
     } catch (err) {
         return res.status(403).json({ message : "Error"})
     }
  }
}
