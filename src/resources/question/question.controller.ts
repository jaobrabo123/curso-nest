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
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { AuthGuard, type RequestWithUser } from "../../auth/auth.guard";

@Controller("question")
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(
        @Body() createQuestionDto: CreateQuestionDto,
        @Request() req: RequestWithUser,
    ) {
        return this.questionService.create(createQuestionDto, req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.questionService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.questionService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateQuestionDto: UpdateQuestionDto,
    ) {
        return this.questionService.update(id, updateQuestionDto);
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.questionService.remove(id);
    }
}
