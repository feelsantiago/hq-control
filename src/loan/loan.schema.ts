import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface BoweredInfo {
    _id: string;

    name: string;
}

export interface BoweredUser {
    _id: string;
    name: string;
}

@Schema({ timestamps: true })
export class Loan {
    public id?: string;

    @Prop({ default: false })
    public returned: boolean;

    @Prop(
        raw({
            _id: { type: String, required: true },
            name: { type: String, required: true },
        }),
    )
    public comic: BoweredUser;

    @Prop(
        raw({
            _id: { type: String, required: true },
            name: { type: String, required: true },
        }),
    )
    public user: BoweredUser;

    @Prop({ required: true })
    public owner: Types.ObjectId;
}

export type LoanDocument = Loan & Document;

export const LoanSchema = SchemaFactory.createForClass(Loan);
