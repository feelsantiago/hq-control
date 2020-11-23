import { IsNotEmpty, IsString } from 'class-validator';

export class LoanDto {
    @IsString()
    @IsNotEmpty()
    public comic: string;

    @IsString()
    @IsNotEmpty()
    public user: string;
}
