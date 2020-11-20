import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User {
    public id?: string;

    @Prop({ required: true })
    public name: string;

    @Prop({ required: true, unique: true })
    public email: string;

    @Prop({ required: true, select: false })
    public password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaFactory = (): typeof UserSchema => {
    UserSchema.pre<UserDocument>('save', async function () {
        if (!this.isModified('password')) {
            return Promise.resolve();
        }

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(this.password, salt);

        this.password = hash;

        return Promise.resolve();
    });

    return UserSchema;
};
