import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../users/entities/user.entity";
import { SignInInput } from "./dto/sign-in.input";
import { JwtService } from "@nestjs/jwt";
import { Profile } from "passport-google-oauth20";
import { Profile as ProfileFacebook } from "passport-facebook";

@Injectable()
export class AuthService {

  constructor(
    @Inject(getModelToken(User)) private readonly userProvider: typeof User,
    private readonly jwtService: JwtService
  ) {
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userProvider.findOne({ where: { email } });
  }


  async validateGoogle(profile: Profile): Promise<any> {

    const { emails: [{ value: email }], name: { familyName: secondLastName, middleName: lastName, givenName: name } } = profile;

    let user: User = await this.userProvider.scope("withOutPass").findOne({ where: { email } });
    if (!user) {
      user = await this.userProvider.scope("withOutPass").create({
        email,
        name: name ?? "",
        lastName: lastName ?? "",
        secondLastName: secondLastName ?? ""
      });
    }
    const token = this.jwtService.sign({ data: user, iss: "/api/auth/google/login" });
    return { token, user };
  }

  async validateFacebook(profile: ProfileFacebook): Promise<any> {
    console.log(profile);
    const { emails: [{ value: email }], name: { familyName: secondLastName, middleName: lastName, givenName: name } } = profile;

    let [user]: [User, boolean] = await this.userProvider.scope("withOutPass").findOrCreate(
      {
        where: { email },
        defaults: {
          email,
          name: name ?? "",
          lastName: lastName ?? "",
          secondLastName: secondLastName ?? ""
        }
      }
    );
    const token = this.jwtService.sign({ data: user, iss: "/api/auth/google/login" });
    return { token, user };
  }

  async signIn(signIn: SignInInput) {
    const userExistent = await this.findOneByEmail(signIn.user);
    if (!userExistent) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    if (!(await userExistent.comparePassword(signIn.password))) {
      throw new HttpException("password or user invalid", HttpStatus.UNAUTHORIZED);
    }
    if (!userExistent.active) {
      throw new HttpException("User with unauthorized, check with the administrator your status", HttpStatus.UNAUTHORIZED);
    }

    const userSuccess = {
      id: userExistent.id,
      active: userExistent.active,
      email: userExistent.email,
      lastName: userExistent.lastName,
      name: userExistent.name,
      secondLastName: userExistent.secondLastName
    };

    const token = this.jwtService.sign({ data: userSuccess, iss: "/auth/sign-in" });

    return {
      token,
      user: userExistent
    };
  }


}
