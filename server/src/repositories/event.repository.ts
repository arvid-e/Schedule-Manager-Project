import EventModel from "@app/models/event.model";
import { IEventData, IEventRepository } from "@app/types/event.types";

export class EventRepository implements IEventRepository {

    constructor(private eventModel: typeof EventModel) {}

    async findAllEvents(): Promise<IEventData[]> {
        return await this.eventModel.find();
    }

    async findById(id: string): Promise<IEventData | null> {
        return await this.eventModel.findById(id);
    }

    async createEvent(eventData: IEventData): Promise<IEventData> {
        return await this.eventModel.create(eventData);
    }

    async deleteEvent(_id: string): Promise<boolean> {
        const deleted = await this.eventModel.deleteOne({ _id });
        return deleted.deletedCount > 0;
    }

    async editEvent(eventData: IEventData): Promise<boolean> {
        const { _id, ...updateFields } = eventData;
        const updated = await this.eventModel.updateOne({ _id }, { $set: updateFields });
        return updated.modifiedCount > 0;
    }
}