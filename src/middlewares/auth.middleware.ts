import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";

export function auth(
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) {
  try {
    let token = req.cookies?.access_token;

    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        error: "User not authorized. Access denied",
      });
    }

    const payload = verifyAccessToken(token);

    req.user = payload;

    next();
  } catch (err) {
    return res.status(401).json({
      error: "User not authorized. Access denied",
    });
  }
}
