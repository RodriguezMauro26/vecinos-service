import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWorkingMessage(): string {
    return 'Application is working!';
  }
}
