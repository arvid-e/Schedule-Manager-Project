import { Schema, model } from 'mongoose';
import { IUser } from '@app/types/auth.types';

const userSchema = new Schema<IUser>({
    username: {
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