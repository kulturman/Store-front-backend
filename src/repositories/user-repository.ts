import { User } from "../models/user";
import { AbstractRepository } from "./abstract-repository";
import client from "./db";
import * as bcrypt from 'bcrypt';

export class UserRepository extends AbstractRepository<User> {

    getTableName(): string {
        return 'users';
    }

    mapToEntity(row: any): User {
        return {
            id: row.id,
            name: row.firstName,
            lastName: row.firstName,
            firstName: row.firstName,
            password: row.password,
            username: row.username
        };
    }

    async create(user: User): Promise<boolean> {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        return client.query('INSERT INTO users ("firstName", "lastName", username, password) VALUES($1, $2, $3, $4)', [
            user.firstName, user.lastName, user.username, hashedPassword
        ])
        .then(res => {
            if (res.rowCount > 0) {
                return Promise.resolve(true);
            }
            return Promise.resolve(true);
        });
    }
    
    findByUsername(username: string): Promise<User | null> {
        return client.query('SELECT * from users WHERE username = $1', [username])
            .then(res => {
                if (res.rows[0]) {
                    return Promise.resolve(this.mapToEntity(res.rows[0]));
                }
                return Promise.resolve(null);
            });
    }
}