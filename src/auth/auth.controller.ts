import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() loginData: LoginUserDTO) {
        return await this.authService.signIn(loginData);
    }
}
