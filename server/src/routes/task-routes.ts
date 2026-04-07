import { Router } from "express";
import { TaskController } from "../controllers/task-controller.js";
import { protect } from "../middleware/auth-middleware.js";
import Task from "../models/task-model.js";
import { TaskRepository } from "../repositories/task-repository.js";
import { TaskService } from "../services/task-service.js";

const router = Router();

const taskRepo = new TaskRepository(Task);

const eventService = new TaskService(taskRepo);
const controller = new TaskController(eventService);

router.get("/", controller.getAllTasks);
router.get("/:id", controller.getTaskById);
router.post("/", protect, controller.createTask);
router.patch("/:id", protect, controller.updateTask);
router.delete("/:id", protect, controller.deleteTask);

export default router;
