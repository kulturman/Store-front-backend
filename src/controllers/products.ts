import { Request, Response } from "express";
import { ProductRepository } from "../repositories/product-repository";

const productRepository = new ProductRepository();

export async function getAll(req: Request, res: Response) {
    const page = req.query.page ? +req.query.page : 1;

    const data = await productRepository.getAll(page);
    return res.send(data);
}

export async function find(req: Request, res: Response) {
    const user = await productRepository.findOne(+req.params.id);

    if (user === null) {
        return res.status(404).json({ 'message' : 'Product not found' });
    }

    return res.send(user);
}

export async function create(req: Request, res: Response) {
    const result = await productRepository.create({ ...req.body });
    return result ? res.status(201).json() : res.status(400).send({ 'message' : 'Unable to create product' });
}