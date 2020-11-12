import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection } from 'mongoose';
import { SeriesController } from './series.controller';
import { SeriesSchema } from './series.schema';
import { SeriesService } from './series.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Collection.name, schema: SeriesSchema }])],
    controllers: [SeriesController],
    providers: [SeriesService],
    exports: [SeriesService],
})
export class CollectionModule {}
