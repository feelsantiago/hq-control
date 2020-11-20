import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserSession } from '../auth/decorators/user-session.decorator';
import { UserInfo } from '../auth/types/user-info';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { SeriesDto } from './series.dto';
import { Series } from './series.schema';
import { SeriesService } from './series.service';

@Controller('series')
@UseGuards(JwtGuard)
export class SeriesController {
    constructor(private readonly seriesService: SeriesService) {}

    @Post()
    public async create(@Body() series: SeriesDto, @UserSession() userInfo: UserInfo): Promise<Series> {
        series.owner = Types.ObjectId(userInfo.id);
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
