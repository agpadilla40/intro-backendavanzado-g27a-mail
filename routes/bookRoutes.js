import express from 'express';
import { createBook, getBookById, getAllBooks } from '../controllers/bookController.js';

const bookRoutes = express.Router();

//TODO: Create book
bookRoutes.post('/', createBook);

//TODO: get book by id

bookRoutes.get('/:bookId', getBookById);

//TODO: get all books

bookRoutes.get('/', getAllBooks);

export default bookRoutes;