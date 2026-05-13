import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { USER_REPOSITORY, type UserRepository } from "./user.repository";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserValidator } from "./user.validator";
import bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        private readonly userValidator: UserValidator,
    ) {}

    async findUsers() {
        return this.userRepository.findMany();
    }

    async createUser(user: CreateUserDTO) {
        await this.userValidator.emailAvailable(user.email);

        user.password = await bcrypt.hash(user.password, 10);

        return this.userRepository.save(user);
    }

    async findById(id: string) {
        const user = await this.userRepository.get(id);
        if (!user) throw new NotFoundException("Usuário não encontrado.");
        return user;
    }

    async updateUser(id: string, userDTO: UpdateUserDTO) {
        const user = await this.userRepository.get(id, {
            selectModel: "internal",
        });
        if (!user) throw new NotFoundException("Usuário não encontrado.");

        return this.userRepository.save({ ...user, ...userDTO });
    }

    async deleteById(id: string) {
        const user = await this.userRepository.get(id);
        if (!user)
            throw new NotFoundException("Não existe usuário com esse id.");
        await this.userRepository.remove(id);
    }
}
