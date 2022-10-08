import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { GetEnv } from "../../../configs/env.validations";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: GetEnv("SECRET_TOKEN")
    });
  }

  async validate(response: any) {
    console.log(response);

    const { data } = response;
    const { email } = data;
    if (!data) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    const user = await this.authService.findOneByEmail(email);
    if (!user) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    return data;
  }
}
