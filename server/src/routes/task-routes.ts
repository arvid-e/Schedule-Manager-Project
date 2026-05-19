import { Router } from "express";
import { TaskController } from "../controllers/task-controller.js";
import { protect } from "../middleware/auth-middleware.js";
import Task from "../models/task-model.js";
import { TaskRepositoryImpl } from "../repositories/task-repository.js";
import { TaskServiceImpl } from "../services/task-service.js";

const router = Router();

const taskRepo = new TaskRepositoryImpl(Task);

const eventService = new TaskServiceImpl(taskRepo);
const controller = new TaskController(eventService);

router.get("/", controller.getAll);
router.get('/week', controller.getWeek);
router.get("/:id", controller.getById);
router.post("/", protect, controller.create);
router.patch("/:id", protect, controller.update);
router.delete("/:id", protect, controller.delete);

export default router;
