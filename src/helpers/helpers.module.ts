import { Module } from "@nestjs/common";
import { LoggerService } from "./logger/logger.service";
import { EmailService } from "./email/email.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [LoggerService, EmailService],
  exports: [LoggerService, EmailService]
})
export class HelpersModule {
}
