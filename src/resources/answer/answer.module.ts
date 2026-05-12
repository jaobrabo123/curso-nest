import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { AuthModule } from '../../auth/auth.module';
import { DatabaseModule } from '../../database/database.module';
import { AnswerRepositoryProvider } from './answer.repository';

@Module({
    imports: [AuthModule, DatabaseModule],
    controllers: [AnswerController],
    providers: [AnswerService, AnswerRepositoryProvider],
    exports: [AnswerRepositoryProvider],
})
export class AnswerModule {}
