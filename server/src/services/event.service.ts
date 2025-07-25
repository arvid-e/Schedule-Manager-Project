import { ICreateEventData, IEventDataDocument, IEventRepository, IEventService, IUpdateEventData } from "../types/event.types";

export class EventService implements IEventService {

  constructor(private eventRepository: IEventRepository) {}

  async getAllEvents(): Promise<IEventDataDocument[]> {
    return this.eventRepository.findAllEvents();
  }

  async getEventById(id: string): Promise<IEventDataDocument | null> {
    return this.eventRepository.findById(id);
  }

  async createEvent(eventData: ICreateEventData): Promise<IEventDataDocument | null> {
    return this.eventRepository.createEvent(eventData);
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.eventRepository.deleteEvent(id);
  }

  async updateEvent(eventData: IUpdateEventData): Promise<boolean> {
    return this.eventRepository.updateEvent(eventData);
  }
    
}