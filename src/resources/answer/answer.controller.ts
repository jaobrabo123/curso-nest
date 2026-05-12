import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AuthGuard, type RequestWithUser } from '../../auth/auth.guard';

@Controller('answer')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(
        @Body() createAnswerDto: CreateAnswerDto,
        @Request() req: RequestWithUser,
    ) {
        return this.answerService.create(createAnswerDto, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.answerService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.answerService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
        return this.answerService.update(id, updateAnswerDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.answerService.remove(id);
    }
}
