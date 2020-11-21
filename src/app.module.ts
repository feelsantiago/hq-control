import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthModule } from './auth/auth.module';
import { ComicModule } from './comic/comic.module';
import { ReportController } from './report/report.controller';
import { SeriesModule } from './series/series.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/hq-control', { useCreateIndex: true }),
        AuthModule,
        UserModule,
        ComicModule,
        SeriesModule,
        ReportController,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
