import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { GetEnv } from "../../../configs/env.validations";
import { Profile, Strategy } from "passport-facebook";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: GetEnv("FACEBOOK_ID"),
      clientSecret: GetEnv("FACEBOOK_SECRET"),
      callbackURL: GetEnv("FACEBOOK_CALLBACK"),
      scope: "email",
      profileFields: ["name", "email"]
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void) {
    return done(null, profile);
  }
}
