import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Collection, Document, Types } from 'mongoose';
import { CollectionSchema } from '../collection/collection.schema';

@Schema({ timestamps: true })
export class Comic {
    @Prop({ required: true })
    public name: string;

    @Prop({ default: 0 })
    public number: number;

    @Prop({ default: '#' })
    public edition: string;

    @Prop({ required: true })
    public publisher: string;

    @Prop({ default: '' })
    public imprint: string;

    @Prop({ default: 0 })
    public year: number;

    @Prop({ default: 0 })
    public price: number;

    @Prop({ default: false })
    public have: boolean;

    @Prop({ default: false })
    public borrowed: boolean;

    @Prop({ default: false })
    public like: boolean;

    @Prop({ default: false })
    public recommends: boolean;

    @Prop({ default: false })
    public reread: boolean;

    @Prop(Types.ObjectId)
    public owner: Types.ObjectId;

    @Prop({ type: [String], default: [] })
    public curiosities: string[];

    @Prop({ type: CollectionSchema })
    public collection: Collection;
}

export type ComicDocument = Comic & Document;

export const ComicSchema = SchemaFactory.createForClass(Comic);
