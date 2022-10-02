import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field()
  name?: string;

  @Field()
  lastName?: string;

  @Field()
  secondLastName?: string;

  @Field()
  active?: boolean;

  @Field()
  email?: string;
}
