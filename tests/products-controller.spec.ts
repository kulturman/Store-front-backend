import request from "supertest";
import { generateUserToken } from "../src/helpers/token-helper";
import client from "../src/repositories/db";
import { ProductRepository } from "../src/repositories/product-repository";
import app from "../src/server";

const token = generateUserToken({
    id: 1,
    firstName: 'Itachi',
    lastName: 'UCHIHA',
    password: '',
    username: 'itachi'
});

describe('GET /api/products', () => {
    beforeEach(async () => {
        await client.query('BEGIN');
    });

    afterEach(async () => {
        await client.query('ROLLBACK');
    });

    it('Should return list of products', async () => {
        const result = await request(app)
            .get('/api/products')
            .expect(200);
        expect(result.body.data[0]).toMatchObject({
            id: 1000,
            name: 'Red wine',
            price: 35
        });

        expect(result.body.meta).toMatchObject({
            numberOfPages: 1,
            totalRows: 2
       })
    })

})

describe('GET /products/id', () => {
    it('Should return 404 if product not found', async () => {
        await request(app)
            .get('/api/products/1500')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
    })

    it('Should return product data if it exists', async () => {
        const { body } = await request(app)
            .get('/api/products/1100')
            .expect(200);
        expect(body)
            .toMatchObject({
                id: 1100,
                name: 'Burger',
                price: 58.40
            });
    })
})

describe('POST /products', () => {
    beforeEach(async () => {
        await client.query('BEGIN');
    });

    afterEach(async () => {
        await client.query('ROLLBACK');
    });

    it('Should return 201 for success', async () => {
        const { body } = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Burger king',
                price: 200
            })
            .expect(201);

        expect(body).toMatchObject({
            id: expect.any(Number),
            name: 'Burger king',
            price: 200
        })
    })
})

describe('DELETE /products/:id', () => {
    beforeEach(async () => {
        await client.query('BEGIN');
    });

    afterEach(async () => {
        await client.query('ROLLBACK');
    });

    it('Should return 200 if product is deleted', async () => {
        const productRepository = new ProductRepository();
        expect(await productRepository.findOne(1000)).toBeTruthy();

        await request(app)
            .delete('/api/products/1000')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(await productRepository.findOne(1000)).toBeFalsy();
    })
})