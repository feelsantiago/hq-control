import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CollectionDto } from './collection.dto';
import { Collection, CollectionDocument } from './collection.schema';

@Injectable()
export class CollectionService {
    constructor(@InjectModel(Collection.name) private readonly collectionModel: Model<CollectionDocument>) {}

    public create(collection: CollectionDto): Promise<Collection> {
        return this.collectionModel.create(collection);
    }

    public update(id: string, collection: Partial<CollectionDto>): Promise<Collection> {
        return this.collectionModel.findByIdAndUpdate(id, { $set: collection }, { new: true }).exec();
    }

    public getById(id: string): Promise<Collection> {
        return this.collectionModel.findById(id).exec();
    }

    public getAll(): Promise<Collection[]> {
        return this.collectionModel.find().sort({ createdAt: -1 }).exec();
    }

    public delete(id: string): Promise<Collection> {
        return this.collectionModel.findByIdAndDelete(id).exec();
    }
}
