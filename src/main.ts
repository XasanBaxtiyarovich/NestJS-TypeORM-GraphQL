import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  const config = app.get(ConfigService)
  const PORT = config.get<number>('API_PORT')

  await app.listen(PORT || 3001, () => {
    console.log(`SERVER RUNING ON PORT ${PORT}`);
    
  });
}
bootstrap();