import { Injectable } from '@nestjs/common';

import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ReservationsRepository } from '../repositories/reservation.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRespository: ReservationsRepository,
  ) {}

  create(createReservationDto: CreateReservationDto) {
    return this.reservationsRespository.create({
      ...createReservationDto,
      userId: '234',
    });
  }

  findAll() {
    return this.reservationsRespository.find({});
  }

  findOne(_id: string, lean: boolean = true) {
    return this.reservationsRespository.findOne({ _id }, lean);
  }

  update(
    _id: string,
    updateReservationDto: UpdateReservationDto,
    lean: boolean = true,
  ) {
    return this.reservationsRespository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
      lean,
    );
  }

  remove(_id: string, lean: boolean = true) {
    return this.reservationsRespository.findOneAndDelete({ _id }, lean);
  }
}
