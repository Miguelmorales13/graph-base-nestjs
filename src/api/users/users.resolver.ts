import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/JwtAuth.guard";

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
  ) {
  }

  @Mutation(returns => User)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: "users" })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: "user" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => Int)
  removeUser(@Args("id", { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
