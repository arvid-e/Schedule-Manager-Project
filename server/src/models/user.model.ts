import { Schema, model, Document } from 'mongoose';
import { IUser } from '../types/user.types';

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        select: false, // Prevents password from being returned in queries by default
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const User = model<IUser>('User', userSchema);
export default User;