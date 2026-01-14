import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './configs/config.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle(' MBRAS — Teste Técnico Developer')
    .setVersion('1.0')
    .addTag('tags')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(configService.get<number>('PORT') ?? 3000);
  logger.debug(`sever on in ${await app.getUrl()}`);
  logger.debug(`swagger on in ${await app.getUrl()}/swagger`);
}
bootstrap().catch((error) => logger.error(error));
