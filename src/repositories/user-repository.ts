import { User } from "../models/user";
import { AbstractRepository } from "./abstract-repository";
import client from "./db";

export class UserRepository extends AbstractRepository<User> {

    getTableName(): string {
        return 'users';
    }

    mapToEntity(row: any): User {
        return {
            id: row.id,
            lastName: row.lastName,
            firstName: row.firstName,
            password: row.password,
            username: row.username
        };
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