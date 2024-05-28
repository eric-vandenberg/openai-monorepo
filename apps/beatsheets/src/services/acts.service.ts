import { Injectable } from '@nestjs/common';
import { CreateActDto } from '../dto/create-act.dto';
import { UpdateActDto } from '../dto/update-act.dto';
import { ActsRepository } from '../repositories/acts.repository';

@Injectable()
export class ActsService {
  constructor(private readonly actRepository: ActsRepository) {}

  create(createBeatDto: CreateActDto) {
    return this.actRepository.create({
      ...createBeatDto,
    });
  }

  findAll() {
    return this.actRepository.find({});
  }

  findOne(_id: string) {
    return this.actRepository.findOne({ _id });
  }

  update(_id: string, updateBeatDto: UpdateActDto) {
    return this.actRepository.findOneAndUpdate(
      { _id },
      { $set: updateBeatDto },
    );
  }

  remove(_id: string) {
    this.actRepository.findOneAndDelete({ _id });
  }
}
