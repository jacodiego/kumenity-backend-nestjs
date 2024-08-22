import { Module } from '@nestjs/common';
import { AuthController } from '@/infrastructure/adapters/http-server/account/controllers/auth.controller';
import { CoreModule } from '@/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [AuthController],
})
export class HttpServerModule {}
