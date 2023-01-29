import { NextFunction, Request, Response } from "express";
import { ProductRepository } from "../repositories/product-repository";

const productRepository = new ProductRepository();

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const page = req.query.page ? +req.query.page : 1;

    const data = await productRepository.getAll(page);
    return res.send(data);
  } catch (error) {
    return next(error);
  }
}

export async function find(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await productRepository.findOne(+req.params.id);

    if (user === null) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.send(user);
  } catch (error) {
    return next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await productRepository.create({ ...req.body });
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await productRepository.findOne(+req.params.id);

    if (product === null) {
      return res.status(404).json({ message: "Product not found" });
    }

    await productRepository.delete(+req.params.id);
    return res.send();
  } catch (error) {
    return next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await productRepository.findOne(+req.params.id);

    if (product === null) {
      return res.status(404).json({ message: "Product not found" });
    }

    await productRepository.update({
      ...req.body,
      id: product.id,
    });
    return res.send();
  } catch (error) {
    return next(error);
  }
}
