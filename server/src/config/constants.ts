import dotenv from 'dotenv';
dotenv.config();

import type { StringValue } from 'ms';

if (!process.env.JWT_SECRET) {
    throw new Error('FATAL ERROR: JWT_SECRET environment variable is not defined!');
}
if (!process.env.JWT_EXPIRES_IN) {
    throw new Error('FATAL ERROR: JWT_EXPIRES_IN environment variable is not defined!');
}

export const JWT_SECRET: string = process.env.JWT_SECRET!;

// Assert JWT_EXPIRES_IN as StringValue
export const JWT_EXPIRES_IN: StringValue = process.env.JWT_EXPIRES_IN! as StringValue;

export const BCRYPT_SALT_ROUNDS: number = parseInt(process.env.BCRYPT_SALT_ROUNDS!);
// Optional: Add validation for BCRYPT_SALT_ROUNDS here too if not already
if (isNaN(BCRYPT_SALT_ROUNDS)) {
    throw new Error('FATAL ERROR: BCRYPT_SALT_ROUNDS environment variable is not a valid number!');
}