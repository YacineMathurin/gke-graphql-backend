import "reflect-metadata"
import { DataSource } from "typeorm"
import { Book } from "./entity/Book"
import dotenv from "dotenv"
dotenv.config({ path: './.env' });

const {MYSQL_DATABASE,MYSQL_USER,MYSQL_PASSWORD, MYSQL_HOST} = process.env;

export const AppDataSource = new DataSource({
    type: "mysql",
    port: 3306,
    host: MYSQL_HOST,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Book], 
    migrations: [],
    subscribers: [],
})
