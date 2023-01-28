import { Router } from "express";
import * as ordersController from "../controllers/orders";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/users/:userId", authMiddleware, ordersController.getByUserId);
router.get("/", authMiddleware, ordersController.getAll);
router.post("/", authMiddleware, ordersController.create);
router.put("/:id", authMiddleware, ordersController.completeOrder);
router.get("/:id", authMiddleware, ordersController.getById);
router.delete("/:id", authMiddleware, ordersController.deleteOrder);

export default router;
