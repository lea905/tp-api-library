import { Model } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données

export interface BookCopyAttributes {
    id?: number;
    bookId: number;
    status: number;
    location: string;
}

export class BookCopy
  extends Model<BookCopyAttributes>
  implements BookCopyAttributes
{
    public id?: number;
    public bookId!: number;
    public status!: number;
    public location!: string;
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
    status: {
        type: "INTEGER",
        allowNull: false,
    },
    location: {
        type: "STRING",
        allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "BookCopy",
  }
);
