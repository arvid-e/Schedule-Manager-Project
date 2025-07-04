import { Schema, model } from 'mongoose';
import { IEventData } from '../types/event.types';

const eventSchema = new Schema<IEventData>({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
    },
}, {
    timestamps: true, 
});

const EventModel = model<IEventData>('Event', eventSchema);
export default EventModel;