import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    public get users(): Model<UserDocument> {
        return this.userModel;
    }

    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    public async create(user: UserDto): Promise<User> {
        return this.userModel.create(user);
    }

    public async update(id: string, user: Partial<UserDto>): Promise<User> {
        return this.userModel.findOneAndUpdate({ _id: Types.ObjectId(id) }, { $set: user }, { new: true }).exec();
    }

    public async getById(id: string): Promise<User> {
        return this.userModel.findOne({ _id: Types.ObjectId(id) }).exec();
    }

    public async findUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email }).select('+password').exec();
    }

    public async getAll(): Promise<User[]> {
        return this.userModel.find().sort({ createdAt: -1 }).exec();
    }

    public async delete(id: string): Promise<User> {
        return this.userModel.findOneAndDelete({ _id: Types.ObjectId(id) }).exec();
    }
}
