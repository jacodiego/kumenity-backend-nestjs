import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from './infrastructure/shared/shared.module';
import { HttpServerModule } from '@/infrastructure/adapters/http-server/http-server.module';

@Module({
  imports: [SharedModule, CoreModule, HttpServerModule, CqrsModule],
})
export class AppModule {}
