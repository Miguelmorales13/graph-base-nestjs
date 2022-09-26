import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SignInInput {
  @Field()
  user?: string;

  @Field()
  password?: string;
}
