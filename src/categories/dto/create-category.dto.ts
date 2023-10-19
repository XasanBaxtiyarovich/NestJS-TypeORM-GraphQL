import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCategoryDto {
    @Field({ nullable: true })
    name: string;
}