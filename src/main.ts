import { NestFactory } from '@nestjs/core';
import { AppConfigService } from './app-config/app-config.service';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const port = app.get(AppConfigService).get('PORT');

  await app.listen(port);
}
bootstrap();
