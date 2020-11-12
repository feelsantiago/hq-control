import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class SeriesDto {
    @IsString()
    public _id: string;

    @ValidateIf((series: SeriesDto) => !series._id)
    @IsString()
    @IsNotEmpty()
    public name: string;
}
