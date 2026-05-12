import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @Get()
    async findUsers() {
        return await this.userService.findUsers();
    }

    @Post()
    async singupUser(@Body() createUser: CreateUserDTO) {
        return await this.userService.createUser(createUser);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.userService.findById(id);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteById(@Param('id') id: string) {
        await this.userService.deleteById(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUser: UpdateUserDTO,
    ) {
        return await this.userService.updateUser(id, updateUser);
    }
}
