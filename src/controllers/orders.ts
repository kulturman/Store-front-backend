import { Request, Response } from "express";

export async function getByUserId(req: Request, res: Response) {
  const userId = req.params.userId;
  const page = req.query.page ? +req.query.page : 1;
}

export async function create(req: Request, res: Response) {}
