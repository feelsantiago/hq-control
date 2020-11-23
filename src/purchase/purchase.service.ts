import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Purchase, PurchaseDocument } from './purchase.schema';

@Injectable()
export class PurchaseService {
    public get purchases(): Model<PurchaseDocument> {
        return this.purchaseModel;
    }

    constructor(@InjectModel(Purchase.name) private readonly purchaseModel: Model<PurchaseDocument>) {}

    public async create(purchase: Purchase): Promise<Purchase> {
        return this.purchases.create(purchase);
    }

    public async getById(id: string, userId: string): Promise<Purchase> {
        return this.purchases.findOne({ _id: Types.ObjectId(id), owner: Types.ObjectId(userId) }).exec();
    }

    public async getAll(userId: string): Promise<Purchase[]> {
        return this.purchases
            .find({ owner: Types.ObjectId(userId) })
            .sort({ createdAt: -1 })
            .exec();
    }
}
