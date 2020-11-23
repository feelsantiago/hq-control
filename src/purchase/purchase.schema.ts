import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ComicType } from '../comic/comic.schema';

@Schema({ timestamps: true })
export class Purchase {
    public id?: string;

    @Prop({ required: true })
    public comic: Types.ObjectId;

    @Prop({ required: true })
    public name: string;

    @Prop({ required: true })
    public price: string;

    @Prop()
    public series: string;

    @Prop({ enum: ComicType, default: ComicType.physical })
    public type: ComicType;

    @Prop({ required: true })
    public owner: Types.ObjectId;
}

export type PurchaseDocument = Purchase & Document;

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
