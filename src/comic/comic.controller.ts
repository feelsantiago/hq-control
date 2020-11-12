import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ComicDto } from './comic.dto';
import { Comic } from './comic.schema';
import { ComicService } from './comic.service';

@Controller('comic')
export class ComicController {
    constructor(private readonly comicService: ComicService) {}

    @Post()
    public async create(@Body() comic: ComicDto): Promise<Comic> {
        return this.comicService.create(comic);
    }

    @Put(':id')
    public update(@Param('id') id: string, @Body() comic: ComicDto): Promise<Comic> {
        return this.comicService.update(id, comic);
    }

    @Get(':id')
    public getById(@Param('id') id: string): Promise<Comic> {
        return this.comicService.getById(id);
    }

    @Get()
    public getAll(): Promise<Comic[]> {
        return this.comicService.getAll();
    }

    @Delete(':id')
    public delete(@Param('id') id: string): Promise<Comic> {
        return this.comicService.delete(id);
    }
}
