import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comic, ComicDocument } from './comic.schema';

@Injectable()
export class ComicService {
    constructor(@InjectModel(Comic.name) private readonly comicModel: Model<ComicDocument>) {}
}
