import { Client } from "pg";

import { config } from "dotenv";

config();

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
})

client.connect();

export default client;
