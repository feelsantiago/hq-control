import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserSession } from '../auth/decorators/user-session.decorator';
import { UserInfo } from '../auth/types/user-info';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Purchase } from './purchase.schema';
import { PurchaseService } from './purchase.service';

@UseGuards(JwtGuard)
@Controller('purchase')
export class PurchaseController {
    constructor(private readonly purchaseService: PurchaseService) {}

    @Get(':id')
    public async getById(@Param('id') id: string, @UserSession() userInfo: UserInfo): Promise<Purchase> {
        return this.purchaseService.getById(id, userInfo.id);
    }

    @Get()
    public getAll(@UserSession() userInfo: UserInfo): Promise<Purchase[]> {
        return this.purchaseService.getAll(userInfo.id);
    }
}
