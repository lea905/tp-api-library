import { Model } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données

export interface BookCopyAttributes {
}

export class BookCopy
  extends Model<BookCopyAttributes>
  implements BookCopyAttributes
{
}

BookCopy.init(
  {},
  {
    sequelize,
    tableName: "BookCopy",
  }
);
