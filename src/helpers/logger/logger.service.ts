import { Injectable } from "@nestjs/common";

export type TypeLogger = "REQUEST" | "RESPONSE" | "ERROR" | "SERVICE";

@Injectable()
export class LoggerService {
  formatLog(
    { method, url, uuid }: any,
    now: number,
    type: TypeLogger,
    object: Object
  ) {
    let timeResponse = Date.now() - now;
    return `[uuid:${uuid}][${method} ${url} ${timeResponse}ms ] [${type}:${JSON.stringify(
      object
    )}] `;
  }
}
