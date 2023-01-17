import { User } from "../models/user";
import { UserRepository } from "../repositories/user-repository";

export function addFixtures() {
    const promises: Array<Promise<any>> = [];

    const users: Array<User> = [
        {
            id: 100,
            firstName: 'Itachi',
            lastName: 'UCHIHA',
            password: '',
            username: 'itachi'
        },
        {
            id: 200,
            firstName: 'Mdara',
            lastName: 'UCHIHA',
            password: '',
            username: 'madara'
        },
        {
            id: 300,
            firstName: 'Kakashi',
            lastName: 'HATAKE',
            password: '',
            username: 'kakahi'
        }
    ];

    const userRepository = new UserRepository();
    users.forEach(user => promises.push(userRepository.create(user)));

    Promise.all(promises);
}