import { Field, Int, ObjectType } from "@nestjs/graphql";
import { AutoIncrement, BeforeCreate, Column, DataType, Is, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { GeneralModel } from "../../General.model";

import * as bcrypt from "bcrypt";

@ObjectType()
@Table({
  paranoid: true,
  timestamps: true,
  underscored: true
})
@Scopes({
  withOutPass: () => ({
    attributes: ["id", "lastName", "name", "secondLastName", "email", "active", "createdAt", "updatedAt"]
  })
})
export class User extends GeneralModel<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(type => Int)
  id?: number;

  @Field()
  @Column({ type: DataType.STRING(100), allowNull: false })
  name?: string;

  @Field()
  @Column({ type: DataType.STRING(100), allowNull: false })
  lastName?: string;

  @Field()
  @Column({ type: DataType.STRING(100), allowNull: false })
  secondLastName?: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  @Field()
  active?: boolean;


  @Is(async function Unique(email: string) {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (user && user.id != this.id) {
      throw new Error("the user already exist");
    }
  })
  @Column({ type: DataType.STRING(200), allowNull: false })
  @Field()
  email?: string;

  @Column({ type: DataType.STRING(60), allowNull: false })
  password?: string;


  @BeforeCreate
  static async creation(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 10);
    instance.email = instance.email.toLowerCase();
  }

  async comparePassword(compare: string): Promise<boolean> {
    return await bcrypt.compare(compare, this.password);
  }
}
