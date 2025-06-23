// tests/api/bookAPI.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const Book = require('../../models/Book');

let mongod;
let createdBookId;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);

  // Create a test book to fetch later
  const book = await Book.create({ title: 'API Book', author: 'Tester' });
  createdBookId = book._id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('API Test - /api/books', () => {
  it('GET /api/books - should respond with 200 and array', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('API Test - /api/books/:id', () => {
  it('GET /api/books/:id - should respond with 200 and book object', async () => {
    const res = await request(app).get(`/api/books/${createdBookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body._id).toBe(createdBookId.toString());
  });

  it('GET /api/books/:id - should respond with 404 for non-existent book', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/books/${nonExistentId}`);
    expect(res.statusCode).toBe(404);
  });
});
