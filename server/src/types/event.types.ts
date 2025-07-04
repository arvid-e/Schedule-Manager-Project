export interface IEventData extends Document {
    _id: string,
    name: string,
    title: string,
    description: string,
    createdAt: Date;
    updatedAt: Date;
}