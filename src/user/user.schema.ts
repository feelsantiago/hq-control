import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
    public id?: string;

    @Prop({ required: true })
    public name: string;

    @Prop({ required: true, unique: true })
    public email: string;

    @Prop({ required: true })
    public password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
