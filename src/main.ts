import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { json } from 'express';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.use(json({ limit: '60'}));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.useGlobalPipes(new ValidationPipe());
  
  // const prismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app)

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API DIFT-POS')
    .setDescription('Documentación API DIFT-POS')
    .setVersion('1.0')
    .addTag('categories')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
