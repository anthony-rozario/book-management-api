const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Book = require('../../models/Book');
const { getBooks } = require('../../controllers/bookController');

let mongod;

describe('Unit Test (Real) - getBooks', () => {
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  it('should return real books from in-memory DB', async () => {
    await Book.create({ title: 'Real Book', author: 'Test Author' });


    const req = {}, res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getBooks(req, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ title: 'Real Book', author: 'Test Author' })])
    );
  });
});