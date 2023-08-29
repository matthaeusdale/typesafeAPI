import { expect } from 'chai';
import request from 'supertest';
import app from '../src/server'; // Update with the actual path to your Express app file

describe('API Tests', () => {
    describe('/api/add Endpoint', () => {
        it('should correctly calculate sum when valid numbers are provided', async () => {
            const response = await request(app)
                .post('/api/add')
                .send({ number1: 5, number2: 3 });

            expect(response.status).to.equal(200);
            expect(response.body.result).to.equal(8);
        });

        it('should return 400 when invalid payload is provided', async () => {
            const response = await request(app)
                .post('/api/add')
                .send({ invalidKey: 'test' });

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.equal({ error: 'Invalid payload' });
        });

        it('should return 400 when invalid types are provided', async () => {
            const response = await request(app)
                .post('/api/add')
                .send({ number1: '12', number2: '124' });

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.equal({ error: 'Invalid payload' });
        });

        it('should return 400 when payload is missing required fields', async () => {
            const response = await request(app)
                .post('/api/add')
                .send({ number1: 5 }) // Missing 'number2'

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.equal({ error: 'Invalid payload' });
        });

        it('should return 400 when payload contains extra fields', async () => {
            const response = await request(app)
                .post('/api/add')
                .send({ number1: 5, number2: 10, extraField: 'extra' })

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.equal({ error: 'Invalid payload' });
        });
    });

    describe('/api/greet Endpoint', () => {
        it('should greet with the provided name when a valid payload is sent', async () => {
            const response = await request(app)
                .post('/api/greet')
                .send({ name: 'Alice' });

            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Hello Alice!');
        });

        it('should return 400 when invalid payload is provided', async () => {
            const response = await request(app)
                .post('/api/greet')
                .send({ invalidKey: 'Alice' });

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.equal({ error: 'Invalid payload' });
        });

        it('should return 400 when invalid type is provided', async () => {
            const response = await request(app)
                .post('/api/greet')
                .send({ name: 123 });

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.equal({ error: 'Invalid payload' });
        });

        it('should return 400 when payload is missing required fields', async () => {
            const response = await request(app)
                .post('/api/greet')
                .send({}) // Missing 'name'

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.equal({ error: 'Invalid payload' });
        });

        it('should return 400 when payload contains extra fields', async () => {
            const response = await request(app)
                .post('/api/greet')
                .send({ name: 'Alice', extraField: 'extra' })

            expect(response.status).to.equal(400);
            expect(response.body).to.deep.equal({ error: 'Invalid payload' });
        });
    });
});
