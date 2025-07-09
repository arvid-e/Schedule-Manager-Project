import { Router } from 'express';
import { EventController } from '../controllers/event.controller';
import { EventService } from '@app/services/event.service';
import { EventRepository } from '@app/repositories/event.repository';

const router = Router();

const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);
const controller = new EventController(eventService);

router.get('/', controller.getAllEvents);

router.post('/', controller.createEvent);

router.get('/:id', controller.getEventById);

router.patch('/:id', controller.editEvent);

router.delete('/:id', controller.deleteEvent);


export default router;
