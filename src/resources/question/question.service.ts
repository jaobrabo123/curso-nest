import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
    QUESTION_REPOSITORY,
    type QuestionRepository,
} from "./question.repository";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";

@Injectable()
export class QuestionService {
    constructor(
        @Inject(QUESTION_REPOSITORY)
        private readonly questionRepository: QuestionRepository,
    ) {}

    async create(createQuestionDTO: CreateQuestionDto, userId: string) {
        return await this.questionRepository.save({
            ...createQuestionDTO,
            userId,
        });
    }

    async findAll() {
        return await this.questionRepository.findMany({
            selectModel: "withAnswers",
        });
    }

    async findOne(id: string) {
        const result = await this.questionRepository.get(id, {
            selectModel: "withAnswers",
        });
        if (!result)
            throw new NotFoundException(
                "Não foi possivel encontrar essa questão.",
            );

        return result;
    }

    async update(id: string, updateQuestionDTO: UpdateQuestionDto) {
        const question = await this.questionRepository.get(id);
        if (!question)
            throw new NotFoundException(
                "Não foi possivel encontrar essa questão.",
            );

        return await this.questionRepository.save({
            ...question,
            ...updateQuestionDTO,
        });
    }

    async remove(id: string) {
        const question = await this.questionRepository.get(id);
        if (!question)
            throw new NotFoundException(
                "Não foi possivel encontrar essa questão.",
            );

        await this.questionRepository.remove(id);
    }
}
