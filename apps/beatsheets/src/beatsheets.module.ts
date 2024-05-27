import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';

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
  ],
  controllers: [BeatsheetsController],
  providers: [BeatsheetsService, BeatsheetsRepository],
})
export class BeatsheetsModule {}
