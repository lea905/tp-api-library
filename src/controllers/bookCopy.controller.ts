import {Body, Controller, Get, Patch, Path, Post, Route, Tags} from "tsoa";
import {BookCopyDTO} from "../dto/bookCopy.dto";
import {bookCollectionService} from "../services/bookCollection.service";
import {BookCopy} from "../models/bookCopy.model";
import {BookDTO} from "../dto/book.dto";
import {Book} from "../models/book.model";
import {bookService} from "../services/book.service";
import {CustomError} from "../middlewares/errorHandler";

@Route("bookCopys")
@Tags("BookCopys")
export class BookCopyController extends Controller {

    @Get("/")
    public async getAllBookCopys(): Promise<BookCopyDTO[]> {
      return bookCollectionService.getAllBookCollections();
    }

    @Get("{id}")
    public async getBookCopyById(id: number): Promise<BookCopyDTO> {
        let bookCopy: BookCopy | null = await bookCollectionService.getBookCopyById(id);

        if (bookCopy == null) {
            let error: CustomError = new Error(`BookCopy ${id} not found`);
            error.status = 404;
            throw error;
        }

        return bookCopy;
    }

    @Post('/')
    public async createBookCopy(@Body() requestBody: BookCopyDTO): Promise<BookCopyDTO> {
        let { book, state,available } = requestBody;

        if (book?.id === undefined) {
            let error: CustomError = new Error("Book ID is required to create a book copy");
            error.status = 400;
            throw error;
        }
        return bookCollectionService.createBookCopyInternal(state, available, book?.id);
    }

    @Patch("{id}")
    public async updateBookCopy(
        @Path() id: number,
        @Body() requestBody: BookCopyDTO
    ): Promise<BookCopyDTO> {
        const {state, available, book} = requestBody;

        if (book?.id === undefined) {
            let error: CustomError = new Error("Book ID is required to update a book copy");
            error.status = 400;
            throw error;
        }
        return bookCollectionService.updateBookCopy(state, available, book?.id, id);
    }

}
