import {Body, Controller, Delete, Get, Patch, Path, Post, Route, Security, Tags} from "tsoa";
import {BookDTO} from "../dto/book.dto";
import {bookService} from "../services/book.service";
import {CustomError} from "../middlewares/errorHandler";
import {Book} from "../models/book.model";
import {authorService} from "../services/author.service";

@Route("books")
@Tags("Books")
export class BookController extends Controller {
  @Get("/")
  @Security("jwt",["book:read"])
  public async getAllBooks(): Promise<BookDTO[]> {
    return bookService.getAllBooks();
  }

  @Get("{id}")
    @Security("jwt",["book:read"])
  public async getBoodById(id: number): Promise<BookDTO> {
    let book: Book | null = await bookService.getBookById(id);

    if(book === null) {
      let error: CustomError = new Error(`Book ${id} not found`);
      error.status = 404;
      throw error;
    }

    return book;
  }

  @Post("/")
    @Security("jwt",["book:create"])
  public async createBook(@Body() requestBody: BookDTO): Promise<BookDTO> {
    let { title, publishYear, author, isbn } = requestBody;

    if(author?.id === undefined) {
      let error: CustomError = new Error("Author ID is required to create a book");
      error.status = 400;
      throw error;
    }
    return bookService.createBook(title, publishYear, author?.id, isbn)
  }


  @Patch("{id}")
  @Security("jwt",["book:update"])
  public async updateBook(
      @Path() id: number,
      @Body() requestBody: BookDTO
  ): Promise<BookDTO> {
    const { title, publishYear, author, isbn } = requestBody;

    if(author?.id === undefined) {
      let error: CustomError = new Error("Author ID is required to create a book");
      error.status = 400;
      throw error;
    }

   return  bookService.updateBook(title, publishYear, author?.id, isbn, id);
  }


  @Delete("{id}")
    @Security("jwt",["book:delete"])
  public async deleteBook(@Path() id: number): Promise<void> {
    const hasBookCopies = await bookService.hasBookCopies(id);
    if (hasBookCopies) {
      const error: CustomError = new Error("Impossible de supprimer le livre");
      error.status = 409;
      throw error;
    }
    await bookService.deleteBook(id);
  }

}