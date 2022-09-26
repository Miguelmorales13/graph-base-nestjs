import { Field, Int, ObjectType, OmitType, PartialType } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";

@ObjectType()
export class UserResponse extends PartialType(OmitType(User, ["password"])) {
  @Field(() => Int)
  id?: number;

}
