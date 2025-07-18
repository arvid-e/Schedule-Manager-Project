import { Document } from "mongoose";

export interface ICreateEventData {
    title: string,
    description: string
}

export interface IUpdateEventData {
    _id: string,
    title?: string,
    description?: string,
    createdAt?: Date;
    updatedAt?: Date;
}


export interface IEventData extends Document {
    _id: string,
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
    updateEvent(eventData: IUpdateEventData): Promise<boolean>;
}

export interface IEventService {
    getAllEvents(): Promise<IEventData[] | null>;
    getEventById(id: string): Promise<IEventData | null>;
    createEvent(eventData: IEventData): Promise<IEventData | null>;
    deleteEvent(id: string): Promise<boolean>;
    updateEvent(eventData: IEventData): Promise<boolean>;
}