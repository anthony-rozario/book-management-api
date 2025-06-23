// tests/integration/bookRoutes.integration.test.js
const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const Book = require('../../models/Book');

let mongod;

describe('Integration Test - /api/books routes', () => {
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  it('POST /api/books - should create a book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({ title: 'Integration Book', author: 'Tester' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Integration Book');
  });

  it('GET /api/books - should return books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
