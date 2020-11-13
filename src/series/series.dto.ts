import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class SeriesDto {
    @ValidateIf((series: SeriesDto) => !series.name)
    @IsString()
    public _id: string;

    @ValidateIf((series: SeriesDto) => !series._id)
    @IsString()
    @IsNotEmpty()
    public name: string;
}
