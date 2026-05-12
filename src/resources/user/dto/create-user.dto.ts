import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EmailField } from '../../../common/decorators/email.decorator';

export class CreateUserDTO {
    @EmailField()
    email!: string;

    @IsString({ message: 'O nome deve ser um texto.' })
    name!: string;

    @IsString()
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    password!: string;
}
