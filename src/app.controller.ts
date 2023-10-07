import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { TransformInterceptor } from './transform.interceptor';
import { ApiTags } from '@nestjs/swagger';

@UseInterceptors(TransformInterceptor)
@Controller()
@ApiTags('main_app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*@Get()
  getHello(): string {
    return this.appService.getHello();
  }*/

  @Get('/')
  @Render('index.hbs')
  async homePage() {
    await new Promise((f) => setTimeout(f, 1000));
    return { isLogged: false };
  }

  // @Get('/reviews')
  // @Render('reviews.hbs')
  // reviews() {
  //   return { isLogged: true };
  // }

  /*@Get('/product')
  @Render('goods.hbs')
  goods() {
    return { isLogged: false };
  }*/
}
