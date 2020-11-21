import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SeriesDto } from './series.dto';
import { Series, SeriesDocument } from './series.schema';

@Injectable()
export class SeriesService {
    public get series(): Model<SeriesDocument> {
        return this.series;
    }

    constructor(@InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>) {}

    public async create(series: SeriesDto): Promise<Series> {
        return this.seriesModel.create(series);
    }

    public async update(id: string, series: Partial<SeriesDto>): Promise<Series> {
        return this.seriesModel.findByIdAndUpdate(id, { $set: series }, { new: true }).exec();
    }

    public async getById(id: string): Promise<Series> {
        return this.seriesModel.findById(id).exec();
    }

    public async getAll(): Promise<Series[]> {
        return this.seriesModel.find().sort({ createdAt: -1 }).exec();
    }

    public async delete(id: string): Promise<Series> {
        return this.seriesModel.findByIdAndDelete(id).exec();
    }
}
