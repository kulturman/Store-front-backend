import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  error: Error | { status: number; message: string },
  req: Request,
  res: Response,
  next: NextFunction
) {
  //Let's log the error here
  console.log(error);
  return res.status(500).send({
    message: "Internal server error",
  });
}
