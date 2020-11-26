import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Purchase } from '../purchase/purchase.schema';
import { PurchaseService } from '../purchase/purchase.service';
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
        private readonly purchaseService: PurchaseService,
    ) {}

    public async create(comic: ComicDto, purchase = false): Promise<Comic> {
        if (comic.series && !comic.series._id) {
            comic.series.owner = comic.owner;
            const series = await this.seriesService.create(comic.series);
            comic.series._id = series.id;
        } else if (comic.series && comic.series._id) {
            const series = await this.seriesService.getById(comic.series._id, comic.owner.toHexString());

            if (!series) {
                throw new UnauthorizedException('Nenhuma coleção encontrada!');
            }

            if (comic.series.isCompleted && !series.isCompleted) {
                await this.seriesService.update(series.id, { isCompleted: true }, comic.owner.toHexString());
                series.isCompleted = true;
            }

            comic.series = series ? { _id: series.id, name: series.name, isCompleted: series.isCompleted } : undefined;
        }

        const result = await this.comics.create(comic);

        if (purchase) {
            const purchaseInfo: Purchase = {
                comic: Types.ObjectId(result.id),
                name: comic.name,
                owner: comic.owner,
                price: comic.price,
                type: comic.type,
                series: comic.series ? comic.series.name : undefined,
            };

            await this.purchaseService.create(purchaseInfo);
        }

        return result;
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
