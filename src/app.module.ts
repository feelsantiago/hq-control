import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthModule } from './auth/auth.module';
import { ComicModule } from './comic/comic.module';
import { LoanModule } from './loan/loan.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ReportModule } from './report/report.module';
import { SeriesModule } from './series/series.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/hq-control', { useCreateIndex: true }),
        AuthModule,
        UserModule,
        ComicModule,
        SeriesModule,
        LoanModule,
        ReportModule,
        PurchaseModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
