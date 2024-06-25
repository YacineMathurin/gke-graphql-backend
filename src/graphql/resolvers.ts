import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

const bookRepository = AppDataSource.getRepository(Book);

export const resolvers = {
  Query: {
    async books() {
      return await bookRepository.find();
    },
    async book(_, {ID}){
        return await bookRepository.findOneBy({id: ID})
    }
  },
  Mutation: {
    async addBook(_, {bookInput:{title, author, age} }){
      const book = {
        title,
        author, 
        age,
        createdAt: new Date().toISOString()
      }
      return await bookRepository.save(book);
    }
  },
};
