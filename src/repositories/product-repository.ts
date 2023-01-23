import { Product } from "../models/product";
import { AbstractRepository } from "./abstract-repository";

export class ProductRepository extends AbstractRepository<Product> {
  getTableName(): string {
    return "products";
  }

  //Since mapToEntity is generic I really don't have any choice
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapToEntity(row: any): Product {
    return {
      id: row.id,
      name: row.name,
      price: +row.price,
    };
  }
}
