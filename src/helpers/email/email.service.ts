import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { GetEnv } from "../../configs/env.validations";
import { TemplateEnum } from "../../enums/template.enum";

@Injectable()
export class EmailService {
  constructor(private readonly httpService: HttpService) {
  }

  async sendEmail(email: string, template: TemplateEnum, data: Object) {
    try {
      const response = await this.httpService.post(`${GetEnv("URL_EMAILS")}/send-email`, {
          email,
          template,
          data
        }
      ).toPromise();
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }
}
