import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern({ cmd: 'hello' })
  async hello(input?: string): Promise<string> {
    try {
      await this.appService.applieDisccounts();
      return `Discount process done`;
    } catch (error) {
      Logger.error(error);
      throw new Error(error);
    }
  }
}
