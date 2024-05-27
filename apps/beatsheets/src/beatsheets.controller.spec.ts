import { Test, TestingModule } from '@nestjs/testing';
import { BeatsheetsController } from './beatsheets.controller';
import { BeatsheetsService } from './beatsheets.service';

describe('BeatsheetsController', () => {
  let controller: BeatsheetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeatsheetsController],
      providers: [BeatsheetsService],
    }).compile();

    controller = module.get<BeatsheetsController>(BeatsheetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
