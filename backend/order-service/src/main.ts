import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = parseInt(process.env.SERVICE_PORT || '23001', 10);
  await app.listen(port, '0.0.0.0');

  console.log(`Order service running on port ${port}`);
}
bootstrap();