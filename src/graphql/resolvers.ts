import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

const bookRepository = AppDataSource.getRepository(Book);

export const resolvers = {
  Query: {
    async books() {
      return await bookRepository.find();
    },
    async book(_, { ID }) {
      return await bookRepository.findOneBy({ id: ID });
    },
    async getBooks(_, { amount }) {
      return await bookRepository.find({
        order: { createdAt: "ASC" },
        take: amount,
      });
    },
  },
  Mutation: {
    async addBook(_, { bookInput: { title, author, age } }) {
      const book = {
        title,
        author,
        age,
        createdAt: new Date().toISOString(),
      };
      return await bookRepository.save(book);
    },
    async deleteBook(_, { ID }) {
      const res = await bookRepository.delete({ id: ID });
      return res.affected ? true : false;
    },
    async editBook(_, { ID, bookInput }) {
      const res = await bookRepository.update(ID, bookInput);
      return res.affected ? true : false;
    },
  },
};
