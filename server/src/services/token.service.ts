import { JWT_EXPIRES_IN, JWT_SECRET } from "@app/config/constants";
import { ITokenService } from "@app/types/auth.types";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken';

export class TokenService implements ITokenService {

    generateJwtToken(payload: { userId: string; roles?: string[]; }): string {
        try {
            if (!JWT_EXPIRES_IN || ! JWT_SECRET) {
                throw new jwt.JsonWebTokenError('JWT_SECRET environment variable is not defined.');
            }
   
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
            return token;
 
        } catch (error) {
            throw new jwt.JsonWebTokenError('Couldnt generate token.')
        }
    }

    verifyJwtToken(token: string) {
        try {
            return jwt.verify(token, JWT_SECRET) as JwtPayload;
        } 
        
        catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                console.warn('JWT Token expired.');
            } else if (error instanceof jwt.JsonWebTokenError) {
                console.warn('Invalid JWT Token:', error.message);
            } else {
                console.error('Unknown JWT verification error:', error);
            }
            return null; 
        }
    }

}

