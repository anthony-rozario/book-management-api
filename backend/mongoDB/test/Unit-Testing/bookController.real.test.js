const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Book = require('../../models/Book');
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../../controllers/bookController');

let mongod;

describe('Unit Test (Real) - bookController', () => {
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
      expect.arrayContaining([
        expect.objectContaining({ title: 'Real Book', author: 'Test Author' })
      ])
    );
  });

  it('should return 400 for invalid ID format in getBookById', async () => {
    const req = { params: { id: 'invalid-id' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getBookById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid book ID format' });
  });

  it('should return 404 for non-existent book in getBookById', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getBookById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should return 404 for updating non-existent book', async () => {
    const req = {
      params: { id: new mongoose.Types.ObjectId().toString() },
      body: { title: 'Updated', author: 'Test' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateBook(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should delete an existing book', async () => {
    const book = await Book.create({ title: 'To be deleted', author: 'Author' });
    const req = { params: { id: book._id.toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteBook(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book deleted successfully' });
  });

  it('should return 404 for deleting non-existent book', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteBook(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
