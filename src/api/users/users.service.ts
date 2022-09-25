import { Inject, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { SequelizeCrudService } from "../sequelize-crud-service";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { getModelToken } from "@nestjs/sequelize";

@Injectable()
export class UsersService extends SequelizeCrudService<User, CreateUserInput, UpdateUserInput> {
  attributesUser: Array<keyof User> = ["id", "lastName", "name", "secondLastName", "email", "active", "createdAt", "updatedAt"];

  constructor(
    @Inject(getModelToken(User)) private readonly userProvider: typeof User
  ) {
    super(userProvider);
  }

  async findAll(): Promise<User[]> {
    return super.findAll({ attributes: this.attributesUser });
  }

  async findOne(id: number): Promise<User> {
    return super.findOne(id, { attributes: this.attributesUser });
  }


  async create(itemCreate: CreateUserInput): Promise<User> {
    const user = await super.create(itemCreate);
    return this.findOne(user.id);
  }
}
