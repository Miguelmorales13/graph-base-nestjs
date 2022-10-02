import { Inject, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { SequelizeCrudService } from "../sequelize-crud-service";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { getModelToken } from "@nestjs/sequelize";
import { password_generator } from "../../configs/helpers.config";
import { EmailService } from "../../helpers/email/email.service";
import { TemplateEnum } from "../../enums/template.enum";

@Injectable()
export class UsersService extends SequelizeCrudService<User, CreateUserInput, UpdateUserInput> {
  attributesUser: Array<keyof User> = ["id", "lastName", "name", "secondLastName", "email", "active", "createdAt", "updatedAt"];

  constructor(
    @Inject(getModelToken(User)) private readonly userProvider: typeof User,
    private readonly emailService: EmailService
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
    const password = password_generator(10);
    console.log(password);
    await this.emailService.sendEmail(itemCreate.email, TemplateEnum.subscription, {
      password,
      userName: itemCreate.name,
      link: ""
    });
    const user = await this.userProvider.create({ ...itemCreate, password });
    console.log(user);
    return this.findOne(user.id);
  }
}
