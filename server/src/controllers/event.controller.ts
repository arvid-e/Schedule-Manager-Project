import { NextFunction, Request, Response } from 'express';
import eventService from '../services/event.service';
import { IEventData } from '../types/event.types';
import { catchAsync } from '../utils/catchAsync'; // Utility to gracefully handle async errors
// import { AppError } from '../utils/appError';         // Custom application error class



export class EventController {

    public getAllEvents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const events = await eventService.findAllEvents();

        
    });

    public getEventById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { title, description } = req.body;
        const event = await eventService.findEventById(title);
        res.send('Got event')

    });

    public createEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        
        const eventData: IEventData = req.body;

        const newEvent = await eventService.create(eventData);
        
        res.status(201).json({
            status: 'success',
            message: 'Event created successfully!',
            data: {
                event: newEvent,
            },
        });
     
    });

    public updateEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        
    });

    public deleteEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        
    });
}

const eventController = new EventController();
export default eventController;