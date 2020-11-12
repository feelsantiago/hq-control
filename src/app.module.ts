import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { CollectionController } from './collection/collection.controller';
import { ComicController } from './comic/comic.controller';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/hq-control'), ComicController, CollectionController],
    controllers: [],
    providers: [],
})
export class AppModule {}
