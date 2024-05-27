import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';

import { BeatsheetsService } from './beatsheets.service';
import { BeatsheetsController } from './beatsheets.controller';
import { BeatsheetsRepository } from './beatsheets.repository';
import { BeatsheetDocument, BeatsheetSchema } from './models/beatsheet.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
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
  providers: [BeatsheetsService, BeatsheetsRepository],
})
export class BeatsheetsModule {}
