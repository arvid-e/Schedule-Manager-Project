import { Router } from 'express';
import { EventController } from '../controllers/event.controller';
import { EventService } from '@app/services/event.service';
import { EventRepository } from '@app/repositories/event.repository';
import EventModel from "@app/models/event.model";
import protect from '@app/middleware/auth.middleware';

const router = Router();
const eventRepository = new EventRepository(EventModel);
const eventService = new EventService(eventRepository);
const controller = new EventController(eventService);

router.get('/', protect, controller.getAllEvents);

router.post('/', protect, controller.createEvent);

router.get('/:id', protect, controller.getEventById);

router.patch('/:id', protect, controller.editEvent);

router.delete('/:id', protect, controller.deleteEvent);


export default router;
