import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Types } from 'mongoose';

export class SeriesDto {
    @ValidateIf((series: SeriesDto) => !series.name)
    @IsString()
    public _id: string;

    @ValidateIf((series: SeriesDto) => !series._id)
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsOptional()
    @IsBoolean()
    public isCompleted: boolean;

    public owner?: Types.ObjectId;
}
