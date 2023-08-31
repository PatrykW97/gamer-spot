import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.user.findUnique({
        where: {
          id: req.query.details,
        },
        include: {
          Post: true,
          friendshipsA: true,
          friendshipsB: true,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      return res.status(403).json({ message: "Error" });
    }
  }
}
