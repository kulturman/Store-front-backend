import { OrderItem } from "../models/orderItem";
import { AbstractRepository } from "./abstract-repository";

export class OrderItemRepository extends AbstractRepository<OrderItem> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapToEntity(row: any): OrderItem {
    return {
      orderId: +row.orderId,
      quantity: +row.quantity,
      productId: +row.productId,
    };
  }
  getTableName(): string {
    return "order_items";
  }
}
