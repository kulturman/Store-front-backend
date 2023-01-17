import { config } from 'dotenv';

export function configureDotEnv() {
    config({
        path: process.env.NODE_ENV === 'test' ? '.env.test': '.env'
    });
}