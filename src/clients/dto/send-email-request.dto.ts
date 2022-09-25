import { TemplateEnum } from "../enums/template.enum";

export class SendEmailRequestDto {
  email: string;

  template: TemplateEnum;
  data: Object;


  constructor(email: string, template: TemplateEnum, data: Object) {
    this.email = email;
    this.template = template;
    this.data = data;
  }
}
