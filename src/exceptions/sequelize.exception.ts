import { HttpException, HttpStatus } from "@nestjs/common";
import { ValidationErrorItem } from "sequelize";

export class SequelizeException extends HttpException {
  constructor(errors: ValidationErrorItem[]) {
    const message = errors.map(error => error.message).join(", ");
    super(message, HttpStatus.CONFLICT);
  }
}
