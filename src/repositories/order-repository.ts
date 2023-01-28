import { Order } from "../models/order";
import { AbstractRepository } from "./abstract-repository";

export class OrderRepository extends AbstractRepository<Order> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapToEntity(row: any): Order {
    return {
      userId: row.userId,
      status: row.status,
      id: +row.id,
    };
  }
  getTableName(): string {
    return "orders";
  }
}
