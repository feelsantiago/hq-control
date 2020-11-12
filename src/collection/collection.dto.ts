import { IsNotEmpty, IsString } from 'class-validator';

export class CollectionDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
}
