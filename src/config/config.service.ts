import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomConfigService {
  constructor(private readonly configService: ConfigService) {}

  get app() {
    return {
      nodeEnv: this.configService.get<string>('NODE_ENV'),
      port: this.configService.get<number>('PORT'),
    };
  }
}
