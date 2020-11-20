import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { SeriesDto } from '../series/series.dto';
import { ComicType } from './comic.schema';

export class ComicDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsOptional()
    @IsNumber()
    public number: number;

    @IsOptional()
    @IsEnum(ComicType)
    public type: ComicType;

    @IsOptional()
    @IsString()
    public edition: string;

    @IsNotEmpty()
    @IsString()
    public publisher: string;

    @IsOptional()
    @IsString()
    public imprint: string;

    @IsOptional()
    @IsNumber()
    public year: number;

    @IsOptional()
    @IsNumber()
    public price: number;

    @IsOptional()
    @IsBoolean()
    public have: boolean;

    @IsOptional()
    @IsBoolean()
    public borrowed: boolean;

    @IsOptional()
    @IsBoolean()
    public like: boolean;

    @IsOptional()
    @IsBoolean()
    public recommends: boolean;

    @IsOptional()
    @IsBoolean()
    public reread: boolean;

    @IsOptional()
    @IsBoolean()
    public reEdition: boolean;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    public curiosities: string[];

    @IsOptional()
    @IsString()
    public critic: string;

    @IsOptional()
    @Type(() => SeriesDto)
    @ValidateNested()
    public series: SeriesDto;

    public owner: Types.ObjectId;
}
