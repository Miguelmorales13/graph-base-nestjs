import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { GetEnv } from "../../../configs/env.validations";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: GetEnv("GOOGLE_ID"),
      clientSecret: GetEnv("GOOGLE_SECRET"),
      callbackURL: GetEnv("GOOGLE_CALLBACK"),
      scope: ["profile", "email"]
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    return done(null, profile);
  }
}
