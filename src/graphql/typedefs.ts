//import { gql } from "@apollo/server";

export const typeDefs = `#graphql
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

    input SignupInput {
        firstname: String
        lastname: String
        email: String
        password: String
    }
    
    input SigninInput {
        email: String
        password: String
    }

    type UserWithToken {
        firstname: String
        lastname: String
        userJwt: String
    }

    type Query {
        books: [Book]
        book(ID: ID!): Book!
        getBooks(qty: Int!): [Book]
    }

    type Mutation {
        signin(signinInput: SigninInput): UserWithToken
        signup(signupInput: SignupInput): UserWithToken
        addBook(bookInput: BookInput!): Book!
        editBook(ID: ID!, bookInput: BookInput): Boolean
        deleteBook(ID: ID!): Boolean
    }
`

