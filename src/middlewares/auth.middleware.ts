import { NextFunction, Request, Response } from "express";
import { error } from "node:console";
import { verifyAccessToken } from "../utils/jwt";

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "User not authorized Access denied" });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ error: "User not authourized Access denied" });
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error: any) {
    return res.status(401).json({ error: "User not authorized Access denied" });
  }
}
