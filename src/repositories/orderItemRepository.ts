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

  getByOrderId(
    id: number
  ): Promise<Array<{ name: string; price: number; quantity: number }>> {
    const data: Array<{ name: string; price: number; quantity: number }> = [];

    return this.db
      .query(
        `SELECT * FROM ${this.getTableName()} AS oi INNER JOIN products AS p ON p.id = oi."productId" WHERE oi."orderId" = $1`,
        [id]
      )
      .then((res) => {
        res.rows.forEach((row) => {
          data.push({
            name: row.name,
            price: +row.price,
            quantity: +row.quantity,
          });
        });
        return data;
      });
  }
}
