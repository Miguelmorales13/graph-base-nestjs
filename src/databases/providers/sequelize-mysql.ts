import { Sequelize } from "sequelize-typescript";
import { User } from "../../api/users/entities/user.entity";
import { GetEnv } from "../../configs/env.validations";

export const sequelizeMysqlProvider = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: GetEnv("SEQUELIZE_DIALECT"),
        host: GetEnv("SEQUELIZE_HOST"),
        port: GetEnv("SEQUELIZE_PORT"),
        username: GetEnv("SEQUELIZE_USERNAME"),
        password: GetEnv("SEQUELIZE_PASSWORD"),
        database: GetEnv("SEQUELIZE_DATABASE")
      });
      sequelize.addModels([User]);
      await sequelize.sync({ logging: true, alter: true });
      return sequelize;
    }

  }
];
