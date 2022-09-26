import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../users/entities/user.entity";
import { SignInInput } from "./dto/sign-in.input";
import { JwtService } from "@nestjs/jwt";

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

    const token = await this.jwtService.sign({ data: userSuccess, iss: "/auth/sign-in" });

    return {
      token,
      user: userExistent
    };
  }


}
