import { Request, Response } from "express";
import { prisma } from "../db/prisma";

export async function me(req: any, res: Response) {
  try {

    const user = await prisma.user.findUnique({
      where: { id: req.user.sub },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        interest: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    res.json(user);
  } catch(error:any) {
    console.log(error)
    res.status(500).json({ error: "Something went wrong" });
  }
}
