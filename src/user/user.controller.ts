import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    public async create(@Body() user: UserDto): Promise<User> {
        return this.userService.create(user);
    }

    @Put(':id')
    public update(@Param('id') id: string, @Body() user: UserDto): Promise<User> {
        return this.userService.update(id, user);
    }

    @Get(':id')
    public getById(@Param('id') id: string): Promise<User> {
        return this.userService.getById(id);
    }

    @Get()
    public getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Delete(':id')
    public delete(@Param('id') id: string): Promise<User> {
        return this.userService.delete(id);
    }
}
