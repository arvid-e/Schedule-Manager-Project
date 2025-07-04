import EventModel from '../models/event.model';
import { IEventData } from "../types/event.types";
import AppError from '../utils/appError';

class EventService {

    public async findAllEvents(): Promise<IEventData[]> {
        return await EventModel.find();
      }

    public async findEventById(_id: string): Promise<IEventData | null> {
        return await EventModel.findOne({ _id });
      }
    
    public async create(eventData: IEventData): Promise<IEventData | null> {
      try {
       
        const newEvent = await EventModel.create(eventData);
  
        if (newEvent && newEvent._id) {
            console.log(`Successfully saved new event with ID: ${newEvent._id}`);
        } 
        
        else {
            console.error('Event creation succeeded, but returned an invalid document.');
            throw new AppError('Event creation failed unexpectedly.', 500);
        }
  
        return newEvent;
  
      } 
      
      catch (error: any) {
        console.error('Error saving event to database:', error.message, error.stack);
  
        if (error.name === 'ValidationError') {
          throw new AppError(`Validation failed: ${error.message}`, 400);

        } else if (error.code === 11000) {
          throw new AppError('An event with this name/title already exists.', 409);

        } else {
          throw new AppError('Failed to save event due to a server error.', 500);
        }
      }

      }
      
}

export default new EventService();