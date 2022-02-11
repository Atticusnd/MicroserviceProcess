import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern({ cmd: 'hello' })
  async hello(input?: string): Promise<string> {
    console.log(`Hello, ${input || 'there'}!`);
    await this.appService.applieDisccounts();
    return `Hello, ${input || 'there'}!`;
  }
}
