import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ANSWER_REPOSITORY, type AnswerRepository } from './answer.repository';
import { PublicAnswer } from './entities/public-answer.entity';

@Injectable()
export class AnswerService {
    constructor(
        @Inject(ANSWER_REPOSITORY)
        private readonly answerRepository: AnswerRepository,
    ) {}

    async create(
        createAnswerDto: CreateAnswerDto,
        userId: string,
    ): Promise<PublicAnswer> {
        const questionId = crypto.randomUUID();
        return await this.answerRepository.save({
            ...createAnswerDto,
            userId,
            questionId,
        });
    }

    async findAll(): Promise<PublicAnswer[]> {
        return await this.answerRepository.findMany();
    }

    async findOne(id: string): Promise<PublicAnswer> {
        const result = await this.answerRepository.get(id);
        if (!result) throw new NotFoundException('Resposta não encontada.');
        return result;
    }

    async update(
        id: string,
        updateAnswerDto: UpdateAnswerDto,
    ): Promise<PublicAnswer> {
        const answer = await this.answerRepository.get(id);
        if (!answer) throw new NotFoundException('Resposta não encontada.');
        return await this.answerRepository.save({
            ...answer,
            ...updateAnswerDto,
        });
    }

    async remove(id: string): Promise<void> {
        const answer = await this.answerRepository.get(id);
        if (!answer) throw new NotFoundException('Resposta não encontada.');
        await this.answerRepository.remove(id);
    }
}
