import { Product } from "../models/product";
import { AbstractRepository } from "./abstract-repository";

export class ProductRepository extends AbstractRepository<Product> {

    getTableName(): string {
        return 'products';
    }

    mapToEntity(row: any): Product {
        return {
            id: row.id,
            name: row.firstName,
            price: row.price
        };
    }
}