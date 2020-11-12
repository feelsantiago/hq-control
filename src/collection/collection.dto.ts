import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CollectionDto {
    @IsString()
    public _id: string;

    @ValidateIf((collection: CollectionDto) => !collection._id)
    @IsString()
    @IsNotEmpty()
    public name: string;
}
