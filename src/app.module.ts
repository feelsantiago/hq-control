import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/hq-control')],
    controllers: [],
    providers: [],
})
export class AppModule {}
