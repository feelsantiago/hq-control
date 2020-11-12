import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CollectionDto } from './collection.dto';
import { Collection } from './collection.schema';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) {}

    @Post()
    public async create(@Body() collection: CollectionDto): Promise<Collection> {
        return this.collectionService.create(collection);
    }

    @Put(':id')
    public update(@Param('id') id: string, @Body() collection: CollectionDto): Promise<Collection> {
        return this.collectionService.update(id, collection);
    }

    @Get(':id')
    public getById(@Param('id') id: string): Promise<Collection> {
        return this.collectionService.getById(id);
    }

    @Get()
    public getAll(): Promise<Collection[]> {
        return this.collectionService.getAll();
    }

    @Delete(':id')
    public delete(@Param('id') id: string): Promise<Collection> {
        return this.collectionService.delete(id);
    }
}
