import { Request, Response } from "express";

export function getAll(req: Request, res: Response) {
    return res.send('It works');
}