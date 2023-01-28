import { Request, Response } from "express";
import { Order } from "../models/order";
import { OrderItem } from "../models/orderItem";
import { OrderRepository } from "../repositories/order-repository";
import { OrderItemRepository } from "../repositories/orderItemRepository";

const orderRepository = new OrderRepository();
const orderItemRepository = new OrderItemRepository();

export async function getByUserId(req: Request, res: Response) {
  const userId = req.params.userId;
  const page = req.query.page ? +req.query.page : 1;

  const orders = await orderRepository.getAll(page, 10, {
    column: "userId",
    value: userId,
  });
  return res.send(orders);
}

export async function create(req: Request, res: Response) {
  const userId = req.body.userId as number;
  const products = req.body.products as Array<{ id: number; quantity: number }>;
  let order: Order | null = null;

  try {
    order = await orderRepository.create({
      userId,
      status: "active",
    });

    const orderItems: Array<OrderItem> = products.map((product) => {
      return {
        orderId: order?.id ? order.id : 0,
        productId: product.id,
        quantity: product.quantity,
      };
    });

    orderItems.forEach(async (orderItem) => {
      try {
        await orderItemRepository.create(orderItem);
      } catch (error) {
        if (order && order.id) {
          await orderRepository.delete(order.id);
        }
        return res
          .status(400)
          .send({ message: "Check your userId or products Ids" });
      }
    });

    return res.status(201).send(order);
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Check your userId or products Ids" });
  }
}

export async function getAll(req: Request, res: Response) {
  const page = req.query.page ? +req.query.page : 1;
  const data = await orderRepository.getAll(page);
  return res.send(data);
}

export async function completeOrder(req: Request, res: Response) {
  const order = await orderRepository.findOne(+req.params.id as number);

  if (order === null) {
    return res.status(404).send({ message: "Order not found" });
  }

  if (order.status === "complete") {
    return res.status(404).send({ message: "Order already completed" });
  }

  orderRepository.update({
    ...order,
    status: "complete",
  });

  return res.send({ message: "Order completed" });
}

export async function deleteOrder(req: Request, res: Response) {
  const order = await orderRepository.findOne(+req.params.id as number);

  if (order === null) {
    return res.status(404).send({ message: "Order not found" });
  }

  orderRepository.delete(order.id as number);

  return res.send({ message: "Order deleted" });
}
