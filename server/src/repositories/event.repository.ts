import EventModel from "@app/models/event.model";
import { ICreateEventData, IEventDataDocument, IEventRepository, IUpdateEventData } from "@app/types/event.types";

export class EventRepository implements IEventRepository {

    constructor(private eventModel: typeof EventModel) {}

    async findAllEvents(): Promise<IEventDataDocument[]> {
        return await this.eventModel.find();
    }

    async findById(id: string): Promise<IEventDataDocument | null> {
        const event = await this.eventModel.findById(id);
        if (event) {
            return event.toObject();
        }
        return event;
    }

    async createEvent(eventData: ICreateEventData): Promise<IEventDataDocument> {
        return (await this.eventModel.create(eventData)).toObject();
    }

    async deleteEvent(_id: string): Promise<boolean> {
        const deleted = await this.eventModel.deleteOne({ _id });
        return deleted.deletedCount > 0;
    }

    async updateEvent(eventData: IUpdateEventData): Promise<boolean> {
        const { _id, ...updateFields } = eventData;
        const updated = await this.eventModel.updateOne({ _id }, { $set: updateFields });
        return updated.modifiedCount > 0;
    }
}