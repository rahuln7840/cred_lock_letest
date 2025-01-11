import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders:
            'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for,External_Network,external_network',
        credentials: true,
    });

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Solar backend')
        .setDescription('Here is the API for smart ring backend')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(5055);
    console.log('server is running 5055...');
}
bootstrap();
