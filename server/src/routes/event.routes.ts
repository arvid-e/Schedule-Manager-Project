import { Router } from 'express';
import { EventController } from '../controllers/event.controller';


export const router = Router();

const controller = new EventController();

router.get('/', controller.getAllEvents);

router.post('/create', controller.createEvent);

router.get('/:id', controller.getEventById);

router.put('/update/:id', controller.updateEvent);

router.delete('/delete/:id', controller.deleteEvent);


export default router;
