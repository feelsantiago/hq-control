import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CollectionDto } from './collection.dto';
import { Collection, CollectionDocument } from './collection.schema';

@Injectable()
export class CollectionService {
    constructor(@InjectModel(Collection.name) private readonly collectionModel: Model<CollectionDocument>) {}

    public async create(collection: CollectionDto): Promise<Collection> {
        return this.collectionModel.create(collection);
    }

    public async update(id: string, collection: Partial<CollectionDto>): Promise<Collection> {
        return this.collectionModel.findByIdAndUpdate(id, { $set: collection }, { new: true }).exec();
    }

    public async getById(id: string): Promise<Collection> {
        return this.collectionModel.findById(id).exec();
    }

    public async getAll(): Promise<Collection[]> {
        return this.collectionModel.find().sort({ createdAt: -1 }).exec();
    }

    public async delete(id: string): Promise<Collection> {
        return this.collectionModel.findByIdAndDelete(id).exec();
    }
}
