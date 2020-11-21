import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Series } from '../series/series.schema';
import { Comic } from '../comic/comic.schema';
import { ComicService } from '../comic/comic.service';
import { SeriesService } from '../series/series.service';

@Injectable()
export class ReportService {
    constructor(private readonly comicService: ComicService, private readonly seriesService: SeriesService) {}

    public async calculateUnCompletedSeriesTotalValue(userId: string): Promise<Array<Series & { total: number }>> {
        const comics = await this.comicService.comics
            .find({
                'series.isCompleted': false,
                have: false,
                owner: Types.ObjectId(userId),
            })
            .exec();

        const seriesMap = new Map<string, Comic[]>();
        comics.forEach((comic) => {
            if (seriesMap.has(comic.series.id)) {
                seriesMap.get(comic.series.id).push(comic);
            } else {
                seriesMap.set(comic.series.id, [comic]);
            }
        });

        const total: Array<Series & { total: number }> = [];
        seriesMap.forEach((comicsList) => {
            const { series } = comicsList[0];
            const sum = comicsList.reduce((acc, next) => acc + next.price, 0);

            total.push({ ...series, total: sum });
        });

        return total;
    }
}
