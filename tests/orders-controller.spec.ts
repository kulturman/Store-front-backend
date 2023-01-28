import request from "supertest";
import { generateUserToken } from "../src/helpers/token-helper";
import client from "../src/repositories/db";
import { OrderRepository } from "../src/repositories/order-repository";
import { OrderItemRepository } from "../src/repositories/orderItemRepository";
import app from "../src/server";

const token = generateUserToken({
  id: 1,
  firstName: "Itachi",
  lastName: "UCHIHA",
  password: "",
  username: "itachi",
});

describe("GET /api/orders", () => {
  beforeEach(async () => {
    await client.query("BEGIN");
  });

  afterEach(async () => {
    await client.query("ROLLBACK");
  });

  it("Should return list of orders", async () => {
    const result = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(result.body.data[0]).toMatchObject({
      id: 1000,
      status: "active",
      userId: 100,
    });

    expect(result.body.meta).toMatchObject({
      numberOfPages: 1,
      totalRows: 2,
    });
  });
});

describe("GET /api/orders/users/:userId", () => {
  beforeEach(async () => {
    await client.query("BEGIN");
  });

  afterEach(async () => {
    await client.query("ROLLBACK");
  });

  it("Should return list of user orders", async () => {
    const result = await request(app)
      .get("/api/orders/users/100")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(result.body.data[0]).toMatchObject({
      id: 1000,
      status: "active",
      userId: 100,
    });

    expect(result.body.meta).toMatchObject({
      numberOfPages: 1,
      totalRows: 1,
    });
  });
});

describe("POST /api/orders", () => {
  beforeEach(async () => {
    await client.query("BEGIN");
  });

  afterEach(async () => {
    await client.query("ROLLBACK");
  });

  it("Should return 201 for success", async () => {
    const orderItemRepository = new OrderItemRepository();

    const { body } = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: 100,
        products: [
          {
            id: 1000,
            quantity: 2,
          },
          {
            id: 1100,
            quantity: 20,
          },
        ],
      })
      .expect(201);
    //Let's check if items are stored
    const orderItems = await orderItemRepository.getAll(
      1,
      Number.MAX_SAFE_INTEGER,
      { column: "orderId", value: body.id as number }
    );
    expect(orderItems.data[0]).toMatchObject({
      orderId: body.id as number,
      quantity: 2,
      productId: 1000,
    });

    expect(orderItems.data[1]).toMatchObject({
      orderId: body.id as number,
      quantity: 20,
      productId: 1100,
    });

    expect(body).toMatchObject({
      id: expect.any(Number),
      status: "active",
      userId: 100,
    });
  });

  it("Should return 400 when userId or one product does not exist", async () => {
    await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: 1000,
        products: [
          {
            id: 1,
            quantity: 2,
          },
        ],
      })
      .expect(400);
  });
});

describe("PUT /api/orders/:orderId complete order", () => {
  beforeEach(async () => {
    await client.query("BEGIN");
  });

  afterEach(async () => {
    await client.query("ROLLBACK");
  });

  it("Should return 201 for success", async () => {
    const orderRepository = new OrderRepository();
    let order = await orderRepository.findOne(1000);
    expect(order?.status).toEqual("active");

    await request(app)
      .put("/api/orders/1000")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    order = await orderRepository.findOne(1000);
    expect(order?.status).toEqual("complete");
  });

  it("Should return 404 if order not found", async () => {
    await request(app)
      .put("/api/orders/10000")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("DELETE /api/orders/:orderId delete order", () => {
  beforeEach(async () => {
    await client.query("BEGIN");
  });

  afterEach(async () => {
    await client.query("ROLLBACK");
  });

  it("Should return 200 for success", async () => {
    const orderRepository = new OrderRepository();
    let order = await orderRepository.findOne(1000);
    expect(order).toBeTruthy();

    await request(app)
      .delete("/api/orders/1000")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    order = await orderRepository.findOne(1000);
    expect(order).toBeFalsy();
  });
});
