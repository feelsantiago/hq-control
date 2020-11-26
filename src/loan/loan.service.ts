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

        if (comic.borrowed) {
            throw new BadRequestException('Comic already bowered!');
        }

        if (!comic.have) {
            throw new BadRequestException("You don't have this comic!");
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
            owner: Types.ObjectId(userId),
        };

        const create = this.loans.create(newLoan as Loan);
        const update = this.comicService.update(comic.id, { borrowed: true }, userId);

        const [result] = await Promise.all([create, update]);

        return result;
    }

    public async giveBack(id: string, userId: string): Promise<Loan> {
        const loan = await this.loans.findOne({ _id: Types.ObjectId(id), owner: Types.ObjectId(userId) }).exec();

        if (!loan) {
            throw new BadRequestException('Loan not found!');
        }

        const updateLoan = this.loans
            .findOneAndUpdate({ _id: Types.ObjectId(loan.id) }, { $set: { returned: true } }, { new: true })
            .exec();

        const updateComic = this.comicService.update(loan.comic._id, { borrowed: false }, userId);

        const [result] = await Promise.all([updateLoan, updateComic]);

        return result;
    }

    public async getById(id: string, userId: string): Promise<Loan> {
        return this.loans.findOne({ _id: Types.ObjectId(id), owner: Types.ObjectId(userId) }).exec();
    }

    public async getAll(userId: string): Promise<Loan[]> {
        return this.loans
            .find({ owner: Types.ObjectId(userId) })
            .sort({ createdAt: -1 })
            .exec();
    }

    public async delete(id: string, userId: string): Promise<Loan> {
        return this.loans.findOneAndDelete({ _id: Types.ObjectId(id), owner: Types.ObjectId(userId) }).exec();
    }
}
