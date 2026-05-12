import { Provider } from '@nestjs/common';
import { User } from '../../generated/prisma/client';
import {
    RepositoryOf,
    SelectModel,
    SelectModels,
    setupVSRepo,
} from '../../../VSRepository/VSRepository';
import { PrismaService } from '../../database/prisma.service';

export const userToRelationSelectModel = {
    id: true,
    email: true,
    name: true,
} satisfies SelectModel<'User'>;

const userSelectModels = {
    public: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
    },
    internal: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        password: true,
    },
} satisfies SelectModels<'User'>;

const userVSRepo = setupVSRepo<User, 'User'>()({
    tableName: 'user',
    pkName: 'id',
    selectModels: userSelectModels,
    defaultSelectModel: 'public',
    methods: {
        findUniqueByEmail: { map: true },
        findMany: { map: true },
        existsByEmail: { map: true },
        findAuthByEmail: {
            map: true,
            proxyTo: 'findUniqueByEmail',
            selectModel: 'internal',
        },
    },
});

export type UserRepository = RepositoryOf<typeof userVSRepo>;

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export const UserRepositoryProvider: Provider = {
    provide: USER_REPOSITORY,
    inject: [PrismaService],
    useFactory: (prisma: PrismaService) => {
        return userVSRepo.build(prisma);
    },
};
