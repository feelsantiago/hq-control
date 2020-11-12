import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Series {
    public id?: string;

    @Prop()
    public name: string;
}

export type SeriesDocument = Series & Document;

export const SeriesSchema = SchemaFactory.createForClass(Series);
