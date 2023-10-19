import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateProductDto {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    price?: number;
}