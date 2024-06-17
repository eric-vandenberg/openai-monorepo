import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { PaymentsService } from './payments.service';
import { CreateChargeDto } from '@app/common';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  async createCharge(data: CreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }
}
