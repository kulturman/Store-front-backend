import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization");
  const secretKey = process.env.JWT_SECRET_KEY;

  if (secretKey === undefined) {
    return res.status(500).send({ message: "Internal server error" });
  }

  if (token === undefined) {
    return res.status(401).send({ message: "No token provided" });
  }

  try {
    verify(token.split(" ")[1], secretKey);
  } catch (error) {
    return res.status(403).send({ message: "Invalid token" });
  }

  next();
}
