import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SeriesDto } from './series.dto';
import { Series, SeriesDocument } from './series.schema';

@Injectable()
export class SeriesService {
    public get series(): Model<SeriesDocument> {
        return this.series;
    }

    constructor(@InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>) {}

    public async create(series: SeriesDto): Promise<Series> {
        return this.series.create(series);
    }

    public async update(id: string, series: Partial<SeriesDto>, userId: string): Promise<Series> {
        return this.series
            .findOneAndUpdate(
                { _id: Types.ObjectId(id), owner: Types.ObjectId(userId) },
                { $set: series },
                { new: true },
            )
            .exec();
    }

    public async getById(id: string, userId: string): Promise<Series> {
        return this.series.findOne({ _id: Types.ObjectId(id), owner: Types.ObjectId(userId) }).exec();
    }

    public async getAll(userId: string): Promise<Series[]> {
        return this.series
            .find({ owner: Types.ObjectId(userId) })
            .sort({ createdAt: -1 })
            .exec();
    }

    public async delete(id: string, userId: string): Promise<Series> {
        return this.series.findOneAndDelete({ _id: Types.ObjectId(id), owner: Types.ObjectId(userId) }).exec();
    }
}
