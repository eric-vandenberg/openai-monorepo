import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import OpenAI from 'openai';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';

import { OpenaiService } from './services/openai.service';
import { OpenaiController } from './controllers/openai.controller';
import { PromptsRepository } from './repositories/prompts.repository';
import { PromptDocument, PromptSchema } from './models/prompt.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: PromptDocument.name, schema: PromptSchema },
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
  controllers: [OpenaiController],
  providers: [
    OpenaiService,
    PromptsRepository,
    {
      provide: OpenAI,
      useFactory: async (configService: ConfigService) => {
        return new OpenAI({
          apiKey: configService.getOrThrow('OPENAI_API_KEY'),
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class PromptsModule {}
