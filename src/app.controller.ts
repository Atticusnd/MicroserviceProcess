import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'hello' })
  hello(input?: string): string {
    console.log(`Hello, ${input || 'there'}!`);
    return `Hello, ${input || 'there'}!`;
  }
}
