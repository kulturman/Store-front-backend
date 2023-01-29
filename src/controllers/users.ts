import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/user-repository";
import { compare, hash } from "bcrypt";
import { generatePassword, generateUserToken } from "../helpers/token-helper";

const userRepository = new UserRepository();

export async function getAll(req: Request, res: Response, next: NextFunction) {
  const page = req.query.page ? +req.query.page : 1;

  try {
    const data = await userRepository.getAll(page);
    return res.send(data);
  } catch (error) {
    return next(error);
  }
}

export async function find(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userRepository.findOne(+req.params.id);

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.send(user);
  } catch (error) {
    return next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userRepository.findByUsername(req.body.username);

    if (user) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const hashedPassword = await hash(req.body.password, 10);
    const result = await userRepository.create({
      ...req.body,
      password: hashedPassword,
    });
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

export async function auth(req: Request, res: Response) {
  const user = await userRepository.findByUsername(req.body.username);

  if (user === null) {
    return res.status(400).send({ message: "Incorrect username or password" });
  }

  const isPasswordValid = await compare(req.body.password, user.password);

  if (!isPasswordValid) {
    return res.status(400).send({ message: "Incorrect username or password" });
  }

  return res.json({
    token: generateUserToken(user),
  });
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userRepository.findOne(+req.params.id);

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    await userRepository.delete(+req.params.id);
    return res.send();
  } catch (error) {
    return next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userRepository.findOne(+req.params.id);

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    await userRepository.update({
      ...req.body,
      id: user.id,
      password: req.body.password
        ? await generatePassword(req.body.password)
        : user.password,
    });
    return res.send();
  } catch (error) {
    return next(error);
  }
}
