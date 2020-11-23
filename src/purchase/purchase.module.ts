import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseController } from './purchase.controller';
import { Purchase, PurchaseSchema } from './purchase.schema';
import { PurchaseService } from './purchase.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Purchase.name, schema: PurchaseSchema }])],
    controllers: [PurchaseController],
    providers: [PurchaseService],
    exports: [PurchaseService],
})
export class PurchaseModule {}
