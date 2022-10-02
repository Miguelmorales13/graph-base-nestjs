import { Column, CreatedAt, DeletedAt, Model, UpdatedAt } from "sequelize-typescript";
import { Field } from "@nestjs/graphql";

export class GeneralModel<T> extends Model<T> {


  @Column({ field: "created_at", allowNull: false })
  @CreatedAt
  @Field()
  createdAt?: Date;
  @Column({ field: "updated_at", allowNull: false })
  @UpdatedAt
  @Field()
  updatedAt?: Date;
  @Column({ field: "deleted_at", allowNull: true })
  @DeletedAt
  @Field()
  deletedAt?: Date;


}
