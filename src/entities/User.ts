import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
  })
  email: string;

  @Column({
    type: "text",
  })
  password: string;

  @Column({
    type: "text",
  })
  firstname: string;
  
  @Column({
    type: "text",
  })
  lastname: string;

  @Column({
    type: "text",
  })
  createdAt: string;
}
