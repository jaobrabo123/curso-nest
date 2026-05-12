import { IsString } from 'class-validator';
import { EmailField } from '../../common/decorators/email.decorator';

export class LoginUserDTO {
    @EmailField()
    email!: string;

    @IsString({ message: 'Senha deve ser uma string.' })
    password!: string;
}
