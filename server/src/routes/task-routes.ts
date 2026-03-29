import Task from "@app/models/task-model";
import { TaskService } from "@app/services/task-service";
import { Router } from "express";
import { TaskController } from "../controllers/task-controller";
import { protect } from "@app/middleware/auth-middleware";
import { TaskRepository } from "@app/repositories/task-repository";

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
