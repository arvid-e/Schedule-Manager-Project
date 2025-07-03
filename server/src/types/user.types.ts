export interface IUser extends Document {
    _id: string,
    name: string;
    password: string; // Storing hashed password
    createdAt: Date;
    updatedAt: Date;
}