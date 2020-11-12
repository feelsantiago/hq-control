import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection } from 'mongoose';
import { CollectionSchema } from './collection.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Collection.name, schema: CollectionSchema }])],
})
export class CollectionModule {}
