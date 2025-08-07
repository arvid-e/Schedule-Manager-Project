import { NextFunction, Request, Response } from 'express';
import { ICreateEventData, IEventDataDocument, IUpdateEventData } from '../types/event.types';
import { catchAsync } from '../utils/catchAsync';
import { EventService } from '../services/event.service';


export class EventController {

    constructor(private eventService: EventService){}

    public getAllEvents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const events = await this.eventService.getAllEvents();

        res.status(200).json({
            status: 'success',
            message: 'Events fetched successfully!',
            data: {
                events
            }
        });
        
    });

    public getEventById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const eventId = req.params.id
        const event = await this.eventService.getEventById(eventId);
        
        if (event == null) {
            res.status(404).json({
                status: 'fail',
                message: 'Event not found!',
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
        const eventData: ICreateEventData = req.body;
        const newEvent = await this.eventService.createEvent(eventData);
        
        res.status(201).json({
            status: 'success',
            message: 'Event created successfully!',
            data: {
                event: newEvent,
            },
        });
     
    });

    public deleteEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const eventId = req.params.id;
        const deleted = await this.eventService.deleteEvent(eventId);

        if (deleted) {
            res.status(200).json({
                status: 'success',
                message: 'Event deleted successfully!',
                data: {
                    id: eventId,
                },
            });
        } 
        
        else {
            res.status(404).json({
                status: 'fail',
                message: 'Event deletion failed!',
                data: {
                    id: eventId,
                },
            });
        }

    });

    public editEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const eventId = req.params.id;
        const updateFields: IUpdateEventData = req.body;

        const eventData: IUpdateEventData = {
            ...updateFields
        }

        const edited = await this.eventService.updateEvent(eventData);

        if (edited) {
            res.status(200).json({
                status: 'success',
                message: 'Event edited successfully!',
                data: {
                    id: eventId,
                },
            });
        } 
        
        else {
            res.status(404).json({
                status: 'fail',
                message: 'Event edit failed!',
                data: {
                    id: eventId,
                },
            });
        }
         
    });
}
