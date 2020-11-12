import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ComicModule } from './comic/comic.module';
import { SeriesModule } from './series/series.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/hq-control'), ComicModule, SeriesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
