import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

class HelloDto {
  id: number;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postHello(
    @Headers('Authorization') auth: string,
    @Body() helloDto: HelloDto,
    @Res() res: Response,
  ): string {
    if (auth !== process.env.AUTH_PASS) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return;
    }
    console.log('auth');
    res.json({
      id: helloDto.id + 1,
    });
  }
}
