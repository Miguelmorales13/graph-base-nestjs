import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";
import { UserProvider } from "./user.provider";

@Module({
  imports: [],
  providers: [UsersResolver, UsersService, ...UserProvider]
})
export class UsersModule {
}
