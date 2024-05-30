import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';

import { ActsService } from './services/acts.service';
import { BeatsService } from './services/beats.service';
import { BeatsheetsService } from './services/beatsheets.service';
import { BeatsheetsController } from './beatsheets.controller';
import { ActsRepository } from './repositories/acts.repository';
import { BeatsRepository } from './repositories/beats.repository';
import { BeatsheetsRepository } from './repositories/beatsheets.repository';
import { ActDocument, ActSchema } from './models/act.schema';
import { BeatDocument, BeatSchema } from './models/beat.schema';
import { BeatsheetDocument, BeatsheetSchema } from './models/beatsheet.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ActDocument.name, schema: ActSchema },
      { name: BeatDocument.name, schema: BeatSchema },
      { name: BeatsheetDocument.name, schema: BeatsheetSchema },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGODB_URI: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [BeatsheetsController],
  providers: [
    ActsService,
    BeatsService,
    BeatsheetsService,
    ActsRepository,
    BeatsRepository,
    BeatsheetsRepository,
  ],
})
export class BeatsheetsModule {}
