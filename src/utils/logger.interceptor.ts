import { CallHandler, DefaultValuePipe, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const [req, res] = context.getArgs();
    // console.log(req.body);
    return next.handle();
    //.pipe(tap((value) => console.log(`Respuesta.....`, value)));
  }
}
