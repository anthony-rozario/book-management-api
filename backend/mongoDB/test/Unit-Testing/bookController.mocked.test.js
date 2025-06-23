const { getBooks } = require('../../controllers/bookController');
const Book = require('../../models/Book');
jest.mock('../../models/Book');

describe('Unit Test (Mocked) - getBooks', () => {
  it('should return list of books from mock', async () => {
    const mockBooks = [{ title: 'Mock Book 1' }, { title: 'Mock Book 2' }];
    Book.find.mockResolvedValue(mockBooks);

    const req = {}, res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getBooks(req, res);
    expect(res.json).toHaveBeenCalledWith(mockBooks);
  });
});
