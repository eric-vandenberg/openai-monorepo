import { Test, TestingModule } from '@nestjs/testing';

import { BeatsheetsService } from './beatsheets.service';

describe('BeatsheetsService', () => {
  let service: BeatsheetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeatsheetsService],
    }).compile();

    service = module.get<BeatsheetsService>(BeatsheetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
