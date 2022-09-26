import { Module } from "@nestjs/common";
import { sequelizeMysqlProvider } from "./providers/sequelize-postgresql";

@Module({
  providers: [...sequelizeMysqlProvider],
  exports: [...sequelizeMysqlProvider]
})
export class DatabasesModule {
}
