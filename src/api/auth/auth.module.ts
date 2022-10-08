import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserProvider } from "../users/user.provider";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { GetEnv } from "../../configs/env.validations";
import { AuthResolver } from "./auth.resolver";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./strategies/google.strategy";
import { FacebookStrategy } from "./strategies/facebook.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: GetEnv("SECRET_TOKEN"),
        signOptions: {
          expiresIn: "1d"
        }
      })
    })
  ],

  providers: [AuthService, AuthResolver, JwtStrategy, GoogleStrategy, FacebookStrategy, ...UserProvider],

  controllers: [AuthController]
})
export class AuthModule {
}
