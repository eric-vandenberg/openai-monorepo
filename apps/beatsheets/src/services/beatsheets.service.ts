import { Injectable } from '@nestjs/common';

import { CreateBeatsheetDto } from '../dto/create-beatsheet.dto';
import { UpdateBeatsheetDto } from '../dto/update-beatsheet.dto';
import { BeatsheetsRepository } from '../repositories/beatsheets.repository';

@Injectable()
export class BeatsheetsService {
  constructor(private readonly beatsheetRepository: BeatsheetsRepository) {}

  create(createBeatsheetDto: CreateBeatsheetDto, userId: string) {
    return this.beatsheetRepository.create({
      ...createBeatsheetDto,
      userId,
    });
  }

  findAll() {
    return this.beatsheetRepository.find({});
  }

  findOne(_id: string, lean: boolean = true) {
    return this.beatsheetRepository.findOne({ _id }, lean);
  }

  updateOne(_id: string, updateBeatsheetDto: UpdateBeatsheetDto) {
    return this.beatsheetRepository.findOneAndUpdate(
      { _id },
      { $set: updateBeatsheetDto },
      false,
    );
  }

  removeOne(_id: string) {
    return this.beatsheetRepository.findOneAndDelete({ _id }, false);
  }
}
