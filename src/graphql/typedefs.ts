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
        getBooks(amount: Int): [Book]
    }

    type Mutation {
        addBook(bookInput: BookInput!): Book!
        editBook(ID: ID!, bookInput: BookInput): Boolean
        deleteBook(ID: ID!): Boolean
    }
`

