import { Document, Types } from "mongoose";

export interface IEventDataDocumentPayload {
    title: string;
    description: string;
}

export interface IUpdateEventData {
    _id: string;
    title?: string;
    description?: string;
}

export interface ICreateEventData {
    title: string;
    description?: string;
}

export interface IEventDataDocument extends IEventDataDocumentPayload, Document {}


export interface IEventRepository {
    findAllEvents(): Promise<IEventDataDocument[]>;
    findById(id: string): Promise<IEventDataDocument | null>;
    createEvent(eventData: ICreateEventData): Promise<IEventDataDocument>;
    deleteEvent(id: string): Promise<boolean>;
    updateEvent(eventData: IUpdateEventData): Promise<boolean>;
}

export interface IEventService {
    getAllEvents(): Promise<IEventDataDocument[]>;
    getEventById(id: string): Promise<IEventDataDocument | null>;
    createEvent(eventData: ICreateEventData): Promise<IEventDataDocument | null>;
    deleteEvent(id: string): Promise<boolean>;
    updateEvent(eventData: IUpdateEventData): Promise<boolean>;
}