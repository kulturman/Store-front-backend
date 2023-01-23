import { Product } from "../models/product";
import { User } from "../models/user";
import { ProductRepository } from "../repositories/product-repository";
import { UserRepository } from "../repositories/user-repository";

export function addFixtures() {
  const promises: Array<Promise<any>> = [];

  const users: Array<User> = [
    {
      id: 100,
      firstName: "Itachi",
      lastName: "UCHIHA",
      password: "",
      username: "itachi",
    },
    {
      id: 200,
      firstName: "Mdara",
      lastName: "UCHIHA",
      password: "",
      username: "madara",
    },
    {
      id: 300,
      firstName: "Kakashi",
      lastName: "HATAKE",
      password: "",
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

  return Promise.all(promises);
}
