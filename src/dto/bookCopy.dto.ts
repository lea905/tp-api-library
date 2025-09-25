import {BookDTO} from "./book.dto";

export interface BookCopyDTO {
    id?: number;
    bookId: number;
    state: number;
    available: number;
    book?: BookDTO;
}