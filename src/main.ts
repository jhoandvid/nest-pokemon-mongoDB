import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  //Asignación de un prefijo a la ruta global
  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
     forbidNonWhitelisted:true
  }))

  await app.listen(3000);
}
bootstrap();
