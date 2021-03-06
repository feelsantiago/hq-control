import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserDto } from './user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    public async create(@Body() user: UserDto): Promise<User> {
        return this.userService.create(user);
    }

    @Put(':id')
    public async update(@Param('id') id: string, @Body() user: UserDto): Promise<User> {
        return this.userService.update(id, user);
    }

    @Get(':id')
    public async getById(@Param('id') id: string): Promise<User> {
        return this.userService.getById(id);
    }

    @Get()
    public async getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<User> {
        return this.userService.delete(id);
    }
}
