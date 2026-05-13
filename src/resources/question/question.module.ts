import { Module } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { QuestionRepositoryProvider } from "./question.repository";
import { AuthModule } from "../../auth/auth.module";
import { DatabaseModule } from "../../database/database.module";

@Module({
    imports: [AuthModule, DatabaseModule],
    controllers: [QuestionController],
    providers: [QuestionService, QuestionRepositoryProvider],
    exports: [QuestionRepositoryProvider],
})
export class QuestionModule {}
