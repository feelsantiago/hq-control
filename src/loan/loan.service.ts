import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ComicService } from '../comic/comic.service';
import { UserService } from '../user/user.service';
import { LoanDto } from './dtos/loan.dto';
import { Loan, LoanDocument } from './loan.schema';

@Injectable()
export class LoanService {
    public get loans(): Model<LoanDocument> {
        return this.loanModel;
    }

    constructor(
        @InjectModel(Loan.name) private readonly loanModel: Model<LoanDocument>,
        private readonly comicService: ComicService,
        private readonly userService: UserService,
    ) {}

    public async create(loan: LoanDto, userId: string): Promise<Loan> {
        const comicQuery = this.comicService.getById(loan.comic, userId);
        const userQuery = this.userService.getById(loan.user);

        const [comic, user] = await Promise.all([comicQuery, userQuery]);

        if (!comic) {
            throw new BadRequestException('Comic Not Found!');
        }

        if (!user) {
            throw new BadRequestException('User Not Found!');
        }

        const newLoan: Partial<Loan> = {
            comic: {
                _id: comic.id,
                name: comic.name,
            },
            user: {
                _id: user.id,
                name: user.name,
            },
        };

        return this.loans.create(newLoan as Loan);
    }

    public async giveBack(id: string, userId: string): Promise<Loan> {
        const loan = await this.loans.findOne({ _id: Types.ObjectId(id), owner: Types.ObjectId(userId) }).exec();

        if (!loan) {
            throw new BadRequestException('Loan not found!');
        }

        return this.loans
            .findOneAndUpdate({ _id: Types.ObjectId(loan.id) }, { $set: { returned: true } }, { new: true })
            .exec();
    }

    public async getById(id: string, userId: string): Promise<Loan> {
        return this.loans.findOne({ _id: Types.ObjectId(id), owner: Types.ObjectId(userId) }).exec();
    }

    public async getAll(userId: string): Promise<Loan[]> {
        return this.loans.find({ owner: userId }).sort({ createdAt: -1 }).exec();
    }

    public async delete(id: string, userId: string): Promise<Loan> {
        return this.loans.findOneAndDelete({ _id: Types.ObjectId(id), owner: Types.ObjectId(userId) }).exec();
    }
}
