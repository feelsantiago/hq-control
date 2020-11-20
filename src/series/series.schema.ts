import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Series {
    public id?: string;

    @Prop({ required: true })
    public name: string;

    @Prop()
    public owner?: Types.ObjectId;

    @Prop({ default: false })
    public isCompleted: boolean;
}

export type SeriesDocument = Series & Document;

export const SeriesSchema = SchemaFactory.createForClass(Series);
