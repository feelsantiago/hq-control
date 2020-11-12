import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comic, ComicSchema } from './comic.schema';
import { ComicService } from './comic.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Comic.name, schema: ComicSchema }])],
    providers: [ComicService],
    exports: [ComicService],
})
export class ComicModule {}
