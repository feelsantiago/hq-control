import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SeriesService } from '../series/series.service';
import { ComicDto } from './comic.dto';
import { Comic, ComicDocument } from './comic.schema';

@Injectable()
export class ComicService {
    public get comics(): Model<ComicDocument> {
        return this.comicModel;
    }

    constructor(
        @InjectModel(Comic.name) private readonly comicModel: Model<ComicDocument>,
        private readonly seriesService: SeriesService,
    ) {}

    public async create(comic: ComicDto): Promise<Comic> {
        if (comic.series && !comic.series._id) {
            const series = await this.seriesService.create(comic.series);
            comic.series._id = series.id;
        }

        if (comic.series && comic.series._id) {
            const series = await this.seriesService.getById(comic.series._id);

            if (comic.series.isCompleted && !series.isCompleted) {
                await this.seriesService.update(series.id, { isCompleted: true });
                series.isCompleted = true;
            }

            comic.series = series ? { _id: series.id, name: series.name, isCompleted: series.isCompleted } : undefined;
        }

        return this.comics.create(comic);
    }

    public update(id: string, comic: Partial<ComicDto>, userId: string): Promise<Comic> {
        return this.comics
            .findOneAndUpdate(
                { _id: Types.ObjectId(id), owner: Types.ObjectId(userId) },
                { $set: comic },
                { new: true },
            )
            .exec();
    }

    public getById(id: string, userId: string): Promise<Comic> {
        return this.comics.findOne({ _id: Types.ObjectId(id), owner: Types.ObjectId(userId) }).exec();
    }

    public getAll(userId: string): Promise<Comic[]> {
        return this.comics
            .find({ owner: Types.ObjectId(userId) })
            .sort({ createdAt: -1 })
            .exec();
    }

    public getComicsBySeries(seriesId: string, userId: string): Promise<Comic[]> {
        return this.comics
            .find({ 'series._id': Types.ObjectId(seriesId), owner: userId })
            .select('-series')
            .exec();
    }

    public delete(id: string, userId: string): Promise<Comic> {
        return this.comics.findOneAndDelete({ _id: Types.ObjectId(id), owner: Types.ObjectId(userId) }).exec();
    }
}
