import { AuthService } from "./auth.service";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { SignInResponse } from "./dto/sign-in.response";


@Resolver(() => SignInResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Mutation(() => SignInResponse)
  signIn(@Args("user") user: string, @Args("password") password: string) {


    return this.authService.signIn({ user, password });
  }
}
