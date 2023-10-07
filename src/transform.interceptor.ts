import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  // time: number;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const now = Date.now()
    //console.log(next.handle().pipe(map(data => ({ data}))))
    return next.handle().pipe(map(data => ({ data})));

    // return next.handle().pipe(map(data => ({ data, time: Date.now() - now })));
  }
}