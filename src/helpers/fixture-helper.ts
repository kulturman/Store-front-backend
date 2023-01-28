import { Order } from "../models/order";
import { Product } from "../models/product";
import { User } from "../models/user";
import { OrderRepository } from "../repositories/order-repository";
import { OrderItemRepository } from "../repositories/orderItemRepository";
import { ProductRepository } from "../repositories/product-repository";
import { UserRepository } from "../repositories/user-repository";

export async function addFixtures() {
  const promises: Array<Promise<User | Product>> = [];

  const users: Array<User> = [
    {
      id: 100,
      firstName: "Itachi",
      lastName: "UCHIHA",
      password: "123456",
      username: "itachi",
    },
    {
      id: 200,
      firstName: "Mdara",
      lastName: "UCHIHA",
      password: "123456",
      username: "madara",
    },
    {
      id: 300,
      firstName: "Kakashi",
      lastName: "HATAKE",
      password: "123456",
      username: "kakahi",
    },
  ];

  const products: Array<Product> = [
    {
      id: 1000,
      name: "Red wine",
      price: 35,
    },
    {
      id: 1100,
      name: "Burger",
      price: 58.4,
    },
  ];

  const userRepository = new UserRepository();
  const productRepository = new ProductRepository();

  users.forEach((user) => promises.push(userRepository.create(user)));
  products.forEach((product) =>
    promises.push(productRepository.create(product))
  );
  await Promise.all(promises);
}

export async function addFixturesWithForeignKeys() {
  const orderRepository = new OrderRepository();
  const promises: Array<Promise<Order>> = [];

  const orders: Array<Order> = [
    {
      userId: 100,
      status: "active",
      id: 1000,
    },
    {
      userId: 200,
      status: "complete",
      id: 2000,
    },
  ];

  orders.forEach((order) => {
    promises.push(orderRepository.create(order));
  });

  await Promise.all(promises);
}
