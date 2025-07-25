import { Schema, model } from 'mongoose';
import { IEventDataDocument } from '../types/event.types';

const eventSchema = new Schema<IEventDataDocument>({
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

const EventModel = model<IEventDataDocument>('Event', eventSchema);
export default EventModel;