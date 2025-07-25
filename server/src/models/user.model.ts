import { Schema, model } from 'mongoose';
import { IUserDocument } from '@app/types/auth.types';

const userSchema = new Schema<IUserDocument>({
    username: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        select: false,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const User = model<IUserDocument>('User', userSchema);
export default User;