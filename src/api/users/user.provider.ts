import { User } from "./entities/user.entity";
import { getModelToken } from "@nestjs/sequelize";

export const UserProvider = [
  {
    provide: getModelToken(User),
    useValue: User
  }
];