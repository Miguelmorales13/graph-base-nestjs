import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { v4 } from "uuid";
import { LoggerService } from "../helpers/logger/logger.service";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  constructor(private readonly loggerService: LoggerService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType<GqlContextType>() === "graphql") {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();

      const parentType = info.parentType.name;
      const fieldName = info.fieldName;
      const body = info.fieldNodes[0]?.loc?.source?.body;
      const requestId = v4();
      const time = Date.now();
      let s = this.loggerService.formatLog({ uuid: requestId, url: "Graphql", method: `${parentType} - ${fieldName}` }, time, "REQUEST", body);

      this.logger.log(s);

      return next.handle().pipe(
        tap({
          next: (val: unknown): void => {
            this.logNext(val, time, requestId, context);
          }
        })
      );
    }
    return next.handle();
  }

  private logNext(body: any, time: number, requestId: string, context: ExecutionContext): void {

    if (context.getType<GqlContextType>() === "graphql") {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      const parentType = info.parentType.name;
      const fieldName = info.fieldName;

      // Remove secure fields from request body and headers
      let formatLog = this.loggerService.formatLog({ uuid: requestId, url: "Graphql", method: `${parentType} - ${fieldName}` }, time, "RESPONSE", body);

      this.logger.log(formatLog);
    }
  }

}
