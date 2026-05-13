import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import {
    USER_REPOSITORY,
    type UserRepository,
} from "../resources/user/user.repository";
import { LoginUserDTO } from "./dto/login-user.dto";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(loginData: LoginUserDTO) {
        const user = await this.userRepository.findAuthByEmail(loginData.email);
        if (!user) throw new UnauthorizedException("Credenciais inválidas.");

        const validPassword = await bcrypt.compare(
            loginData.password,
            user.password,
        );
        if (!validPassword)
            throw new UnauthorizedException("Credenciais inválidas.");

        const payload = { sub: user.id };

        return { accessToken: await this.jwtService.signAsync(payload) };
    }
}
