import { IEventData, IEventRepository, IEventService } from "../types/event.types";

export class EventService implements IEventService {

  constructor(private eventRepository: IEventRepository) {}

  async getAllEvents(): Promise<IEventData[]> {
    return this.eventRepository.findAllEvents();
  }

  async getEventById(id: string): Promise<IEventData | null> {
    return this.eventRepository.findById(id);
  }

  async createEvent(eventData: IEventData): Promise<IEventData | null> {
    return this.eventRepository.createEvent(eventData);
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.eventRepository.deleteEvent(id);
  }

  async editEvent(eventData: IEventData): Promise<boolean> {
    return this.eventRepository.editEvent(eventData);
  }
    
}