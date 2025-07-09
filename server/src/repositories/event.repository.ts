import { IEventData, IEventRepository } from "@app/types/event.types";
import EventModel from "@app/models/event.model";

export class EventRepository implements IEventRepository {

    async findAllEvents(): Promise<IEventData[]> {
        return await EventModel.find();
    }

    async findById(id: string): Promise<IEventData | null> {
        return await EventModel.findById(id);
    }

    async createEvent(eventData: IEventData): Promise<IEventData> {
        return await EventModel.create(eventData);
    }

    async deleteEvent(_id: string): Promise<boolean> {
        const deleted = await EventModel.deleteOne({ _id });
        return deleted.deletedCount > 0;
    }

    async editEvent(eventData: IEventData): Promise<boolean> {
        const { _id, ...updateFields } = eventData;
        const updated = await EventModel.updateOne({ _id }, { $set: updateFields });
        return updated.modifiedCount > 0;
    }
}