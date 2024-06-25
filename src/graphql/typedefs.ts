import { gql } from "apollo-server";

export const typeDefs = gql`
    type Book {
        id: String
        title: String
        author: String
        age: Int
        createdAt: String
    }

    input BookInput {
        title: String
        author: String
        age: Int
    }

    type Query {
        books: [Book]
        book(ID: ID!): Book!
        getBooks(amont: Int): [Book]
    }

    type Mutation {
        addBook(bookInput: BookInput!): Book!
        editBook(bookInput: BookInput): Book
        deleteBook(ID: ID!): Boolean
    }
`

