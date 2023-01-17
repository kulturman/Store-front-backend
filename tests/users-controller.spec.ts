import request from "supertest";
import { generateUserToken } from "../src/helpers/token-helper";
import client from "../src/repositories/db";
import app from "../src/server";

const token = generateUserToken({
    id: 1,
    firstName: 'Itachi',
    lastName: 'UCHIHA',
    password: '',
    username: 'itachi'
});

describe('GET /api/users', () => {
    beforeEach(async () => {
        await client.query('BEGIN');
    });

    afterEach(async () => {
        await client.query('ROLLBACK');
    });

    it('Should get a 401 if token not provided', async () => {
        await request(app)
            .get('/api/users')
            .expect(401);
    })

    it('Should return list of users', async () => {
        const result = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(result.body.data[0]).toMatchObject({
            id: 1,
            firstName: 'Itachi',
            lastName: 'UCHIHA',
            password: '',
            username: 'itachi'
        });

        expect(result.body.meta).toMatchObject({
            numberOfPages: 1,
            totalRows: 3
       })
    })

})

describe('GET /users/id', () => {
    it('Should return 404 if user not found', async () => {
        await request(app)
            .get('/api/users/1500')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
    })

    it('Should return user data if it exists', async () => {
        const { body } = await request(app)
            .get('/api/users/2')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(body)
            .toMatchObject({
                id: 2,
                lastName: 'Mdara',
                firstName: 'Mdara',
                password: '',
                username: 'madara'
            });
    })
})

describe('POST /users', () => {
    beforeEach(async () => {
        await client.query('BEGIN');
    });

    afterEach(async () => {
        await client.query('ROLLBACK');
    });

    it('Should return 400 if username is already used', async () => {
        const { body } = await request(app)
            .post('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName: 'Itachi',
                lastName: 'UCHIHA',
                password: '123456',
                username: 'itachi'
            })
            .expect(400);
        expect(body).toMatchObject({ message: 'Username is already taken' })
    })

    it('Should return 201 for success', async () => {
        await request(app)
            .post('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName: 'Sasuke',
                lastName: 'UCHIHA',
                password: '1234567',
                username: 'sasuke'
            })
            .expect(201);
    })
})