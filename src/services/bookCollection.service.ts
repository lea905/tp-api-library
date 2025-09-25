import {CustomError} from "../middlewares/errorHandler";
import {Book} from "../models/book.model";
import {BookCopy} from "../models/bookCopy.model";

export class BookCollectionService{

    public getAllBookCollections(): Promise<BookCopy[]> {
        return BookCopy.findAll({
            include: [{
                model: Book,
                as: 'book'
            }]
        });
    }

}

export const bookCollectionService = new BookCollectionService();