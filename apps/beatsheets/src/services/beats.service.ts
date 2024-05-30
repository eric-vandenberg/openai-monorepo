import { Injectable } from '@nestjs/common';
import { CreateBeatDto } from '../dto/create-beat.dto';
import { UpdateBeatDto } from '../dto/update-beat.dto';
import { BeatsRepository } from '../repositories/beats.repository';

@Injectable()
export class BeatsService {
  constructor(private readonly beatRepository: BeatsRepository) {}

  create(createBeatDto: CreateBeatDto) {
    return this.beatRepository.create({
      ...createBeatDto,
    });
  }

  findAll() {
    return this.beatRepository.find({});
  }

  findOne(_id: string) {
    return this.beatRepository.findOne({ _id });
  }

  update(_id: string, updateBeatDto: UpdateBeatDto) {
    return this.beatRepository.findOneAndUpdate(
      { _id },
      { $set: updateBeatDto },
    );
  }

  remove(_id: string) {
    return this.beatRepository.findOneAndDelete({ _id });
  }
}
