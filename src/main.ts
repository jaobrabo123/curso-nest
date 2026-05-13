import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { UnprocessableEntityException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            exceptionFactory: (errors) =>
                new UnprocessableEntityException(errors),
        }),
    );

    const config = new DocumentBuilder()
        .setTitle("Fórum API")
        .setDescription("API para um fórum")
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api", app, document);

    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
