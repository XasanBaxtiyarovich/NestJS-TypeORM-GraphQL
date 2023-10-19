import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity('users')
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    name: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @CreateDateColumn()
    createAt: Date;

    @Field()
    @UpdateDateColumn()
    updateAt: Date;
}