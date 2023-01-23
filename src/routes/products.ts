import { Router } from "express";
import * as productsController from "../controllers/products";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/", productsController.getAll);
router.get("/:id", productsController.find);
router.post("/", authMiddleware, productsController.create);
router.delete("/:id", authMiddleware, productsController.remove);

export default router;
