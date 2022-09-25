import { Module } from "@nestjs/common";
import { sequelizeMysqlProvider } from "./providers/sequelize-mysql";

@Module({
  providers: [...sequelizeMysqlProvider],
  exports: [...sequelizeMysqlProvider]
})
export class DatabasesModule {
}
