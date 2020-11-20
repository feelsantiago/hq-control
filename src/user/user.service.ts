import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    public async create(user: UserDto): Promise<User> {
        return this.userModel.create(user);
    }

    public async update(id: string, user: Partial<UserDto>): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, { $set: user }, { new: true }).exec();
    }

    public async getById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    public async getAll(): Promise<User[]> {
        return this.userModel.find().sort({ createdAt: -1 }).exec();
    }

    public async delete(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
