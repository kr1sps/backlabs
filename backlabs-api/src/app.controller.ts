// src/app.controller.ts
import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root(): string {
    return 'Backlabs API is running!';
  }
}
