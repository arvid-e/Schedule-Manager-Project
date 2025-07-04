import { NextFunction, Request, Response } from 'express';
import eventService from '../services/event.service';
import { IEventData } from '../types/event.types';
import { catchAsync } from '../utils/catchAsync'; // Utility to gracefully handle async errors
// import { AppError } from '../utils/appError';         // Custom application error class



export class EventController {

    public getAllEvents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const events = await eventService.findAllEvents();

        res.status(201).json({
            status: 'success',
            message: 'Fetched all events successfully!',
            data: {
                event: events,
            },
        });
        
    });

    public getEventById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const _id = req.params.id
        const event = await eventService.findEventById(_id);
        
        if (event == null) {
            res.status(500).json({
                status: 'fail',
                message: 'Failed fetching event!',
                data: {
                    event: event,
                },
            });
        } 
        
        else {
            res.status(201).json({
                status: 'success',
                message: 'Event fetched successfully!',
                data: {
                    event: event,
                },
            });
        }

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
        const _id = req.params.id;
        console.log("Controller: ID " + _id)
        const deleted = await eventService.deleteEvent(_id);

        if (deleted) {
            res.status(201).json({
                status: 'success',
                message: 'Event deleted successfully!',
                data: {
                    id: _id,
                },
            });
        } 
        
        else {
            res.status(500).json({
                status: 'fail',
                message: 'Event deletion failed!',
                data: {
                    id: _id,
                },
            });
        }

    });
}

const eventController = new EventController();
export default eventController;