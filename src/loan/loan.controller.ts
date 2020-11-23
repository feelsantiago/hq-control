import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserSession } from '../auth/decorators/user-session.decorator';
import { UserInfo } from '../auth/types/user-info';
import { LoanDto } from './dtos/loan.dto';
import { Loan } from './loan.schema';
import { LoanService } from './loan.service';

@UseGuards(JwtGuard)
@Controller('loan')
export class LoanController {
    constructor(private readonly loanService: LoanService) {}

    @Post()
    public async create(@Body() loan: LoanDto, @UserSession() userInfo: UserInfo): Promise<Loan> {
        return this.loanService.create(loan, userInfo.id);
    }

    @Put(':id')
    public async giveBack(@Param('id') id: string, @UserSession() userInfo: UserInfo): Promise<Loan> {
        return this.loanService.giveBack(id, userInfo.id);
    }

    @Get(':id')
    public async getById(@Param('id') id: string, @UserSession() userInfo: UserInfo): Promise<Loan> {
        return this.loanService.getById(id, userInfo.id);
    }

    @Get()
    public async getAll(@UserSession() userInfo: UserInfo): Promise<Loan[]> {
        return this.loanService.getAll(userInfo.id);
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @UserSession() userInfo: UserInfo): Promise<Loan> {
        return this.loanService.delete(id, userInfo.id);
    }
}
