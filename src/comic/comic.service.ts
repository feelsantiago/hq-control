import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SeriesService } from '../series/series.service';
import { ComicDto } from './comic.dto';
import { Comic, ComicDocument } from './comic.schema';

@Injectable()
export class ComicService {
    constructor(
        @InjectModel(Comic.name) private readonly comicModel: Model<ComicDocument>,
        private readonly seriesService: SeriesService,
    ) {}

    public async create(comic: ComicDto): Promise<Comic> {
        if (comic.series && !comic.series._id) {
            const collection = await this.seriesService.create(comic.series);
            comic.series._id = collection.id;
        }

        return this.comicModel.create(comic);
    }

    public update(id: string, comic: Partial<ComicDto>): Promise<Comic> {
        return this.comicModel.findByIdAndUpdate(id, { $set: comic }, { new: true }).exec();
    }

    public getById(id: string): Promise<Comic> {
        return this.comicModel.findById(id).exec();
    }

    public getAll(): Promise<Comic[]> {
        return this.comicModel.find().sort({ createdAt: -1 }).exec();
    }

    public delete(id: string): Promise<Comic> {
        return this.comicModel.findByIdAndDelete(id).exec();
    }
}
