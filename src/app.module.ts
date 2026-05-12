import { Module } from '@nestjs/common';
import { UserModule } from './resources/user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './resources/question/question.module';
import { AnswerModule } from './resources/answer/answer.module';

@Module({
    imports: [
        UserModule,
        DatabaseModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        QuestionModule,
        AnswerModule,
    ],
})
export class AppModule {}
