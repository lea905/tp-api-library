import { Author } from "../models/author.model";
import {Book} from "../models/book.model";
import {BookCopy} from "../models/bookCopy.model";

export class AuthorService {
  // Récupère tous les auteurs
  public async getAllAuthors(): Promise<Author[]> {
    return Author.findAll();
  }

  // Récupère un auteur par ID
  public async getAuthorById(id: number): Promise<Author | null> {
    return Author.findByPk(id);
  }

  // Crée un nouvel auteur
  public async createAuthor(
    firstName: string,
    lastName: string,
  ): Promise<Author> {
    return Author.create({firstName: firstName, lastName: lastName });
  }

  // Supprime un auteur par ID
  public async deleteAuthor(id: number): Promise<void> {
    const author = await Author.findByPk(id);
    if (author) {
      await author.destroy();
    }
  }

  // Met à jour un auteur
  public async updateAuthor(
    id: number,
    firstName?: string,
    lastName?: string
  ): Promise<Author | null> {
    const author = await Author.findByPk(id);
    if (author) {
      if (firstName) author.firstName = firstName;
      if (lastName) author.lastName = lastName;
      await author.save();
      return author;
    }
    return null;
  }

  async hasBookCopies(authorId: number): Promise<boolean> {
    const count = await BookCopy.count({
      include: [{
        model: Book,
        as: 'book',
        where: { authorId }
      }]
    });
    return count > 0;
  }



}

export const authorService = new AuthorService();
