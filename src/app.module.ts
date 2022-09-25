import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ApiModule } from "./api/api.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { DatabasesModule } from "./databases/databases.module";
import { validate } from "./configs/env.validations";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver
    }),
    ApiModule,

    DatabasesModule, ConfigModule.forRoot({ validate })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
