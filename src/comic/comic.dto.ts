import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { CollectionDto } from '../collection/collection.dto';

export class ComicDto {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsOptional()
    @IsNumber()
    public number: number;

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
    @Type(() => Types.ObjectId)
    public owner: Types.ObjectId;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    public curiosities: string[];

    @IsOptional()
    @Type(() => CollectionDto)
    @ValidateNested()
    public collection: CollectionDto;
}
