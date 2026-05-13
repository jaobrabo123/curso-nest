import { ApiProperty } from "@nestjs/swagger";

export class PublicAnswer {
    @ApiProperty()
    id!: string;
    @ApiProperty()
    body!: string;
    @ApiProperty()
    userId!: string;
    @ApiProperty()
    questionId!: string;
}
