import { Provider } from "@nestjs/common";
import {
    RepositoryOf,
    SelectModels,
    setupVSRepo,
} from "../../../VSRepository/VSRepository";
import { PrismaService } from "../../database/prisma.service";
import { Question } from "../../generated/prisma/client";

const questionSelectModels = {
    public: {
        id: true,
        title: true,
        body: true,
        userId: true,
    },
    withAnswers: {
        id: true,
        title: true,
        body: true,
        userId: true,
        answers: {
            select: {
                id: true,
                body: true,
                questionId: true,
                userId: true,
            },
        },
    },
} satisfies SelectModels<"Question">;

const questionVSRepo = setupVSRepo<Question, "Question">()({
    tableName: "question",
    pkName: "id",
    selectModels: questionSelectModels,
    defaultSelectModel: "public",
    methods: {
        findMany: { map: true },
    },
});

export type QuestionRepository = RepositoryOf<typeof questionVSRepo>;

export const QUESTION_REPOSITORY = Symbol("QUESTION_REPOSITORY");

export const QuestionRepositoryProvider: Provider = {
    provide: QUESTION_REPOSITORY,
    inject: [PrismaService],
    useFactory: (prisma: PrismaService) => {
        return questionVSRepo.build(prisma);
    },
};
