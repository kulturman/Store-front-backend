import { Request, Response } from "express";
import { UserRepository } from "../repositories/user-repository";

const userRepository = new UserRepository();

export function getAll(req: Request, res: Response) {
    return res.send('It works');
}

export async function create(req: Request, res: Response) {
    const user = await userRepository.findByUsername(req.body.username);

    if (user) {
        return res.status(400).json({ 'message' : 'Username is already taken' })
    }

    const result = await userRepository.create({ ...req.body });
    return result ? res.status(201).json() : res.status(400).send({ 'message' : 'Unable to create user' });
}