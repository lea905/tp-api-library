import {CustomError} from "../middlewares/errorHandler";
import {Book} from "../models/book.model";
import {BookCopy} from "../models/bookCopy.model";
import {BookService, bookService} from "./book.service";
import {Author} from "../models/author.model";
import {AuthorService} from "./author.service";

export class BookCollectionService{
    public bookService = new BookService();
    public getAllBookCollections(): Promise<BookCopy[]> {
        return BookCopy.findAll({
            include: [{
                model: Book,
                as: 'book'
            }]
        });
    }

    public async getBookCopyById(id: number): Promise<BookCopy | null> {
        return BookCopy.findByPk(id,{
            include : [{
                model: Book,
                as: 'book'
            }]
        })
    }

    public async createBookCopyInternal(state: number, available: number, bookId: number): Promise<BookCopy> {
        let book : Book | null = await this.bookService.getBookById(bookId);
        if (book === null) {
            let error: CustomError = new Error(`Book ${book} not found`);
            error.status = 404;
            throw error;
        }
        return BookCopy.create({ state, available, bookId });
    }

    public async updateBookCopy(state: number, available: number, bookId: number | undefined, id: number): Promise<BookCopy> {
        const bookCopy = await this.getBookCopyById(id);
        if (!bookCopy) {
            const error: CustomError = new Error(`BookCopy ${id} not found`);
            error.status = 404;
            throw error;
        } else {
            if (bookId !== undefined) {
                let book: Book | null = await this.bookService.getBookById(bookId);
                if (book === null) {
                    let error: CustomError = new Error(`Book ${bookId} not found`);
                    error.status = 404;
                    throw error;
                }
                bookCopy.bookId = bookId;
            }

            if (available!== undefined) {
                bookCopy.available = available;
            }

            if (state !== undefined) {
                bookCopy.state = state;
            }
            await bookCopy.save();
            return bookCopy;
        }
    }
    public async deleteBookCopy(id: number): Promise<void> {
        await BookCopy.destroy({ where: { id } });
    }
}

export const bookCollectionService = new BookCollectionService();