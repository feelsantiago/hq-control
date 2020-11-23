import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComicModule } from '../comic/comic.module';
import { UserModule } from '../user/user.module';
import { LoanController } from './loan.controller';
import { Loan, LoanSchema } from './loan.schema';
import { LoanService } from './loan.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]), ComicModule, UserModule],
    controllers: [LoanController],
    providers: [LoanService],
    exports: [LoanService],
})
export class LoanModule {}
