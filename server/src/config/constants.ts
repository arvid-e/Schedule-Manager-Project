if (!process.env.JWT_SECRET) {
    throw new Error('FATAL ERROR: JWT_SECRET environment variable is not defined!');
}
if (!process.env.JWT_EXPIRES_IN) {
    throw new Error('FATAL ERROR: JWT_EXPIRES_IN environment variable is not defined!');
}

export const JWT_SECRET: string = process.env.JWT_SECRET!;
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN!;
export const BCRYPT_SALT_ROUNDS: number = parseInt(process.env.BCRYPT_SALT_ROUNDS!);