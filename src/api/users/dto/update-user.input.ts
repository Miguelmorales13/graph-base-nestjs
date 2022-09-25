import { CreateUserInput } from "./create-user.input";
import { Field, InputType, Int, OmitType, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput extends PartialType(OmitType(CreateUserInput, ["password"])) {
  @Field(() => Int)
  id?: number;
}
