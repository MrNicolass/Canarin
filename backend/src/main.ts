import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      logLevels: (process.env.LOG_LEVEL?.split(',').map(level => level.trim()) as ('log' | 'error' | 'warn' | 'debug' | 'verbose')[])
        ?? ['log', 'error', 'warn', 'debug', 'verbose'],
      timestamp: true
    })
  });
  
  //#region Swagger config
  const config = new DocumentBuilder()
  .setTitle('Canarin API')
  .setDescription('Veja abaixo as rotas disponíveis e como utilizar!')
  .setVersion('1.0.0')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  //#endregion
  
  await app.listen(process.env.SERVER_PORT ?? 3000);
  
  const serverUrl = await app.getUrl();
  Logger.log(`Iniciando servidor na porta ${(serverUrl).substring((serverUrl).length-4)}!`);
}

bootstrap();