import { Router } from "express";
import * as usersController from "../controllers/users";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/", authMiddleware, usersController.getAll);
router.get("/:id", authMiddleware, usersController.find);
router.post("/", authMiddleware, usersController.create);
router.delete("/:id", authMiddleware, usersController.remove);
router.post("/auth", usersController.auth);

export default router;
