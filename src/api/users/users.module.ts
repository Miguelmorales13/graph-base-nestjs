import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";
import { UserProvider } from "./user.provider";
import { HelpersModule } from "../../helpers/helpers.module";

@Module({
  imports: [HelpersModule],
  providers: [UsersResolver, UsersService, ...UserProvider]
})
export class UsersModule {
}
