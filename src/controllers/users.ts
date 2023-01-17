import { Request, Response } from "express";
import { UserRepository } from "../repositories/user-repository";
import { compare, hash } from 'bcrypt';
import { generateUserToken } from "../helpers/token-helper";

const userRepository = new UserRepository();

export async function getAll(req: Request, res: Response) {
    const page = req.query.page ? +req.query.page : 1;

    const data = await userRepository.getAll(page);
    return res.send(data);
}

export async function find(req: Request, res: Response) {
    const user = await userRepository.findOne(+req.params.id);

    if (user === null) {
        return res.status(404).json({ 'message' : 'User not found' });
    }

    return res.send(user);
}

export async function create(req: Request, res: Response) {
    const user = await userRepository.findByUsername(req.body.username);

    if (user) {
        return res.status(400).json({ 'message' : 'Username is already taken' })
    }

    const hashedPassword = await hash(req.body.password, 10);
    const result = await userRepository.create({ ...req.body, password: hashedPassword });
    return res.status(201).json(result);
}

export async function auth(req: Request, res: Response) {
    const user = await userRepository.findByUsername(req.body.username);

    if (user === null) {
        return res.status(400).send({ message: 'Incorrect username or password' });
    }

    const isPasswordValid = await compare(req.body.password, user.password);

    if (!isPasswordValid) {
        return res.status(400).send({ message: 'Incorrect username or password' });
    }

    return res.json({
        token: generateUserToken(user)
    });
}

export async function remove(req: Request, res: Response) {
    const user = await userRepository.findOne(+req.params.id);

    if (user === null) {
        return res.status(404).json({ 'message' : 'User not found' });
    }

    await userRepository.delete(+req.params.id);
    return res.send();
}