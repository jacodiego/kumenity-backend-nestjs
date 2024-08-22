import { Module } from '@nestjs/common';
import { AuthService } from './account/application/services/auth.service';
import { CqrsModule } from '@nestjs/cqrs';
import { SignUpHandler } from './account/application/commands/handlers/sign-up.handler';
import { AccountService } from '@/core/account/domain/services/account.service';
import {
  ACCOUNT_REPOSITORY,
  PersistenceModule,
} from '@/infrastructure/adapters/persistence/persistence.module';
import { AccountRepository } from '@/core/account/application/ports/out/account.repository';

@Module({
  imports: [PersistenceModule, CqrsModule],
  providers: [
    AccountService,
    AuthService,
    {
      provide: SignUpHandler,
      useFactory: (
        repository: AccountRepository,
        accountService: AccountService,
      ) => new SignUpHandler(repository, accountService),
      inject: [ACCOUNT_REPOSITORY, AccountService],
    },
  ],
  exports: [AuthService, CqrsModule],
})
export class CoreModule {}
