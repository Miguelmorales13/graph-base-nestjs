import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GetEnv } from "./configs/env.validations";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(GetEnv("PORT"));
}

bootstrap();
