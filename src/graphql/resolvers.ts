import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken";
import { Book } from "../entities/Book";
import { User } from "../entities/User";
import dotenv from "dotenv";
import throwCustomError, { errorTypes } from "./error-handler";
import bcrypt from "bcrypt";

dotenv.config({ path: "./.env" });
const { JWT_EXPIRY_TIME, JWT_PRIVATE_KEY } = process.env;
const bookRepository = AppDataSource.getRepository(Book);
const userRepository = AppDataSource.getRepository(User);

export const resolvers = {
  Query: {
    async books() {
      return await bookRepository.find();
    },
    async book(_, { ID }) {
      return await bookRepository.findOneBy({ id: ID });
    },
    async getBooks(_, { qty }) {
      return await bookRepository.find({
        order: { createdAt: "DESC" },
        take: qty,
      });
    },
  },
  Mutation: {
    async signup(_, { signupInput: { firstname, lastname, email, password } }) {
      const knownUser = await userRepository.findOne({ where: { email } });
      if (knownUser) {
        throwCustomError("User Already exist", errorTypes.ALREADY_EXIST);
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const createUser = {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      };
      const user = await userRepository.save(createUser);
      const token = await jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        JWT_PRIVATE_KEY,
        { expiresIn: JWT_EXPIRY_TIME }
      );

      return {
        firstname,
        lastname,
        userJwt: token,
      };
    },
    async signin(_, { signinInput: { email, password } }) {
      const user = await userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throwCustomError("Error when Signing In !", errorTypes.BAD_USER_INPUT);
      }
      const passwordMatched = await bcrypt.compare(password, user.password)

      if (passwordMatched) {
        const { id, email, firstname, lastname } = user;
        const token = await jwt.sign(
          {
            userId: id,
            email: email,
          },
          JWT_PRIVATE_KEY,
          { expiresIn: JWT_EXPIRY_TIME }
        );
        return {
          firstname,
          lastname,
          userJwt: token,
        };
      }
      throwCustomError("Error when Signing In !", errorTypes.BAD_USER_INPUT);
    },
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
