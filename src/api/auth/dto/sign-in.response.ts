import { Field, ObjectType } from "@nestjs/graphql";
import { UserResponse } from "./user.response";

@ObjectType()
export class SignInResponse {
  @Field()
  token: string;

  @Field(() => UserResponse)
  user: UserResponse;
}
