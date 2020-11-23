import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseModule } from '../purchase/purchase.module';
import { SeriesModule } from '../series/series.module';
import { ComicController } from './comic.controller';
import { Comic, ComicSchema } from './comic.schema';
import { ComicService } from './comic.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Comic.name, schema: ComicSchema }]), SeriesModule, PurchaseModule],
    controllers: [ComicController],
    providers: [ComicService],
    exports: [ComicService],
})
export class ComicModule {}
