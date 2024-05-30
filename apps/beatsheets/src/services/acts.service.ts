import { Injectable } from '@nestjs/common';
import { CreateActDto } from '../dto/create-act.dto';
import { UpdateActDto } from '../dto/update-act.dto';
import { ActsRepository } from '../repositories/acts.repository';

@Injectable()
export class ActsService {
  constructor(private readonly actRepository: ActsRepository) {}

  create(createActDto: CreateActDto) {
    return this.actRepository.create({
      ...createActDto,
    });
  }

  findAll() {
    return this.actRepository.find({});
  }

  findOne(_id: string) {
    return this.actRepository.findOne({ _id });
  }

  updateOne(_id: string, updateActDto: UpdateActDto) {
    return this.actRepository.findOneAndUpdate(
      { _id },
      { $set: updateActDto },
      false,
    );
  }

  removeOne(_id: string) {
    return this.actRepository.findOneAndDelete({ _id }, false);
  }
}
