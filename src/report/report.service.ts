import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { SeriesDocument } from '../series/series.schema';
import { Comic } from '../comic/comic.schema';
import { ComicService } from '../comic/comic.service';
import { SeriesService } from '../series/series.service';
import { UnCompletedSeriesReport } from './types/uncompleted-series-report';

@Injectable()
export class ReportService {
    constructor(private readonly comicService: ComicService, private readonly seriesService: SeriesService) {}

    public async calculateUnCompletedSeriesTotalValue(userId: string): Promise<UnCompletedSeriesReport[]> {
        const comics = await this.comicService.comics
            .find({
                'series.isCompleted': false,
                have: false,
                owner: Types.ObjectId(userId),
            })
            .lean()
            .exec();

        const seriesMap = new Map<string, Comic[]>();
        comics.forEach((comic) => {
            const _id = ((comic.series as SeriesDocument)._id as Types.ObjectId).toHexString();

            if (seriesMap.has(_id)) {
                seriesMap.get(_id).push(comic);
            } else {
                seriesMap.set(_id, [comic]);
            }
        });

        const total: UnCompletedSeriesReport[] = [];
        seriesMap.forEach((comicsList) => {
            const { series } = comicsList[0];
            const sum = comicsList.reduce((acc, next) => acc + next.price, 0);

            total.push({ ...series, total: sum });
        });

        return total;
    }
}
