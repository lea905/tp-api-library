import { Model } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
import { Book } from "./book.model";

export interface BookCopyAttributes {
    id?: number;
    bookId: number;
    state: number;
    available: number;
    book?: Book;
}

export class BookCopy
  extends Model<BookCopyAttributes>
  implements BookCopyAttributes
{
    public id?: number;
    public bookId!: number;
    public state!: number;
    public available!: number;
    public book?: Book;
}

BookCopy.init(
  {
    id: {
        type: "INTEGER",
        autoIncrement: true,
        primaryKey: true,
    },
    bookId: {
        type: "INTEGER",
        allowNull: false,
        field: "book_id",
    },
    state: {
        type: "INTEGER",
        allowNull: false,
    },
    available: {
        type: "INTEGER",
        allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "BookCopy",
  }
);

BookCopy.belongsTo(Book, { foreignKey: "bookId", as: "book" });