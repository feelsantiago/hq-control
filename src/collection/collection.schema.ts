import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Collection {
    public id: string;

    @Prop()
    public name: string;
}

export type CollectionDocument = Collection & Document;

export const CollectionSchema = SchemaFactory.createForClass(Collection);
