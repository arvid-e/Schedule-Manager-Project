export interface IEventData extends Document {
    _id: string,
    name: string,
    title: string,
    description: string,
    createdAt: Date;
    updatedAt: Date;
}

export interface IEventRepository {
    findAllEvents(): Promise<IEventData[]>;
    findById(id: string): Promise<IEventData | null>;
    createEvent(eventData: IEventData): Promise<IEventData>;
    deleteEvent(id: string): Promise<boolean>;
    editEvent(eventData: IEventData): Promise<boolean>;
}

export interface IEventService {
    getAllEvents(): Promise<IEventData[] | null>;
    getEventById(id: string): Promise<IEventData | null>;
    createEvent(eventData: IEventData): Promise<IEventData | null>;
    deleteEvent(id: string): Promise<boolean>;
    editEvent(eventData: IEventData): Promise<boolean>;
}