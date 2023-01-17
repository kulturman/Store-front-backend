import { sign } from "jsonwebtoken";
import { User } from "../models/user";

export function generateUserToken(user: User) {
    const secretKey = process.env.JWT_SECRET_KEY;
    
    if (secretKey === undefined) {
        throw new Error('Secret key not defined');
    }
    return sign({ userId: user.id }, secretKey, { expiresIn: '24h' });
}