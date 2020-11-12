import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeriesController } from './series.controller';
import { Series, SeriesSchema } from './series.schema';
import { SeriesService } from './series.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }])],
    controllers: [SeriesController],
    providers: [SeriesService],
    exports: [SeriesService],
})
export class SeriesModule {}
