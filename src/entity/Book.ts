import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "text"
    })
    title: string

    @Column({
        type: "text"
    })
    author: string

    @Column({
        type: "int"
    })
    age: number

    @Column({
        type: "text"
    })
    createdAt: string
}
