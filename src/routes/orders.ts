import { Router } from "express";
import * as ordersController from "../controllers/orders";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/:userId", authMiddleware, ordersController.getByUserId);

export default router;
