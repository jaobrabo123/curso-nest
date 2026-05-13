import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateAnswerDto {
    @ApiProperty()
    @IsString()
    body!: string;

    @ApiProperty()
    @IsUUID()
    questionId!: string;
}
