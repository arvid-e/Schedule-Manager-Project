import protect from "@app/middleware/auth-middleware";
import EventModel from "@app/models/task-model";
import { EventRepository } from "@app/repositories/task-repository";
import { EventService } from "@app/services/task-service";
import { Router } from "express";
import { EventController } from "../controllers/task-controller";

const router = Router();
const eventRepository = new EventRepository(EventModel);
const eventService = new EventService(eventRepository);
const controller = new EventController(eventService);

router.get("/", protect, controller.getAllEvents);

router.post("/", protect, controller.createEvent);

router.get("/:id", protect, controller.getEventById);

router.patch("/:id", protect, controller.editEvent);

router.delete("/:id", protect, controller.deleteEvent);

export default router;
