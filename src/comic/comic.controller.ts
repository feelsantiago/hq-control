import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserInfo } from '../auth/types/user-info';
import { UserSession } from '../auth/decorators/user-session.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ComicDto } from './comic.dto';
import { Comic } from './comic.schema';
import { ComicService } from './comic.service';

@Controller('comic')
@UseGuards(JwtGuard)
export class ComicController {
    constructor(private readonly comicService: ComicService) {}

    @Post()
    public async create(@Body() comic: ComicDto, @UserSession() userInfo: UserInfo): Promise<Comic> {
        comic.owner = Types.ObjectId(userInfo.id);
        return this.comicService.create(comic);
    }

    @Put(':id')
    public async update(
        @Param('id') id: string,
        @Body() comic: ComicDto,
        @UserSession() userInfo: UserInfo,
    ): Promise<Comic> {
        return this.comicService.update(id, comic, userInfo.id);
    }

    @Get(':id')
    public async getById(@Param('id') id: string, @UserSession() userInfo: UserInfo): Promise<Comic> {
        return this.comicService.getById(id, userInfo.id);
    }

    @Get()
    public async getAll(@UserSession() userInfo: UserInfo): Promise<Comic[]> {
        return this.comicService.getAll(userInfo.id);
    }

    @Get('series/:id')
    public async getComicBySeriesId(
        @Param('id') seriesId: string,
        @UserSession() userInfo: UserInfo,
    ): Promise<Comic[]> {
        return this.comicService.getComicsBySeries(seriesId, userInfo.id);
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserSession() userInfo: UserInfo): Promise<Comic> {
        return this.comicService.delete(id, userInfo.id);
    }
}
