import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SeriesDto } from './series.dto';
import { Series } from './series.schema';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
    constructor(private readonly seriesService: SeriesService) {}

    @Post()
    public async create(@Body() series: SeriesDto): Promise<Series> {
        return this.seriesService.create(series);
    }

    @Put(':id')
    public update(@Param('id') id: string, @Body() series: SeriesDto): Promise<Series> {
        return this.seriesService.update(id, series);
    }

    @Get(':id')
    public getById(@Param('id') id: string): Promise<Series> {
        return this.seriesService.getById(id);
    }

    @Get()
    public getAll(): Promise<Series[]> {
        return this.seriesService.getAll();
    }

    @Delete(':id')
    public delete(@Param('id') id: string): Promise<Series> {
        return this.seriesService.delete(id);
    }
}
