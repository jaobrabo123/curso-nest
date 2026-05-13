import { Provider } from "@nestjs/common";
import { RepositoryOf, setupVSRepo } from "../../../VSRepository/VSRepository";
import { Answer } from "../../generated/prisma/client";
import { PrismaService } from "../../database/prisma.service";

const answerVSRepo = setupVSRepo<Answer, "Answer">()({
    tableName: "answer",
    pkName: "id",
    selectModels: {
        public: {
            id: true,
            body: true,
            questionId: true,
            userId: true,
        },
    },
    defaultSelectModel: "public",
    methods: {
        findMany: { map: true },
    },
});

export type AnswerRepository = RepositoryOf<typeof answerVSRepo>;

export const ANSWER_REPOSITORY = Symbol("ANSWER_REPOSITORY");

export const AnswerRepositoryProvider: Provider = {
    provide: ANSWER_REPOSITORY,
    inject: [PrismaService],
    useFactory: (prisma: PrismaService) => {
        return answerVSRepo.build(prisma);
    },
};
