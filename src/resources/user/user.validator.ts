import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, type UserRepository } from "./user.repository";

@Injectable()
export class UserValidator {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) {}

    async emailAvailable(email: string) {
        const existsWithEmail = await this.userRepository.existsByEmail(email);

        if (existsWithEmail)
            throw new ConflictException("Já existe um usuário com esse email");
    }
}
