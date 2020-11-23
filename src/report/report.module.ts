import { Module } from '@nestjs/common';
import { ComicModule } from '../comic/comic.module';
import { SeriesModule } from '../series/series.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
    imports: [SeriesModule, ComicModule],
    controllers: [ReportController],
    providers: [ReportService],
    exports: [ReportService],
})
export class ReportModule {}
