import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cors
  app.enableCors({ origin: getCorsOrigins(), credentials: true });

  // SwaggerModule
  const config = new DocumentBuilder()
    .setTitle('Core NestJs')
    .setDescription('none')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('Starting on ', process.env.PORT);

  await app.listen(3000);
}
bootstrap();

function getCorsOrigins(): Array<string> | string {
  const origins = process.env.CORS_ORIGINS;
  if (!origins) return '*';

  return origins.split(',').map((origin) => origin.trim());
}
