import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserSession } from '../auth/decorators/user-session.decorator';
import { UserInfo } from '../auth/types/user-info';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ReportService } from './report.service';
import { UnCompletedSeriesReport } from './types/uncompleted-series-report';

@Controller('report')
@UseGuards(JwtGuard)
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Get('series/uncompleted')
    public async getUnCompletedSeriesReport(@UserSession() userInfo: UserInfo): Promise<UnCompletedSeriesReport[]> {
        return this.reportService.calculateUnCompletedSeriesTotalValue(userInfo.id);
    }
}
