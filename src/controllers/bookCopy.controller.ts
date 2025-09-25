import {Controller, Get, Route, Tags} from "tsoa";
import {BookCopyDTO} from "../dto/bookCopy.dto";
import {bookCollectionService} from "../services/bookCollection.service";
import {BookCopy} from "../models/bookCopy.model";

@Route("bookCopys")
@Tags("BookCopys")
export class BookCopyController extends Controller {

    @Get("/")
    public async getAllBookCopys(): Promise<BookCopyDTO[]> {
      return bookCollectionService.getAllBookCollections();
    }


}
