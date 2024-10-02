import { SignUpDto } from '@/core/account/application/dto/sign-up.dto';
import { Account } from '@/core/account/domain/entities/account';
import { AccountService } from '@/core/account/domain/services/account.service';
import { CqrsModule, ICommandHandler } from '@nestjs/cqrs';
import { SignUpHandler } from '@/core/account/application/commands/handlers/sign-up.handler';
import { AccountRepository } from '@/core/account/application/ports/out/account.repository';
import { SignUpCommand } from '@/core/account/application/commands/sign-up.command';
import { AuthService } from '@/core/account/application/services/auth.service';
import { MongoDbAccountRepository } from '@/infrastructure/adapters/persistence/account/mongodb-account.repository';
import { PersistenceModule, ACCOUNT_REPOSITORY } from '@/infrastructure/adapters/persistence/persistence.module';
import { TestingModule, Test } from '@nestjs/testing';
import { AuthUsecases } from '@/core/account/application/ports/in/auth.usecases';

function AccountRepositoryMock(returnValue: any): AccountRepository {
  return {
    create: jest.fn().mockReturnValue(Promise.resolve(returnValue)),
    login: jest.fn().mockReturnValue(Promise.resolve(returnValue)),
    emailExists: jest.fn().mockReturnValue(Promise.resolve(false)),
    usernameExists: jest.fn().mockReturnValue(Promise.resolve(false)),
  };
}

describe('Auth sign up use case', () => {
  let command: ICommandHandler;
  let authService: AuthUsecases;

  beforeEach(async () => {
    /* const repositoryMock = AccountRepositoryMock(new Account());
    command = new SignUpHandler(repositoryMock, new AccountService()); */
    const accountRepositoryMock = {};

    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, PersistenceModule],
      providers: [
        AuthService,
        AccountService,
        {
          provide: SignUpHandler,
          useFactory: (
            repository: AccountRepository,
            accountService: AccountService,
          ) => new SignUpHandler(repository, accountService),
          inject: [ACCOUNT_REPOSITORY, AccountService],
        },
      ],
    })
      .overrideProvider(MongoDbAccountRepository)
      .useValue(accountRepositoryMock)
      .compile();
    authService = await module.resolve(AuthService);
  });

  it('should be register an account', async () => {
    const data: SignUpDto = {
      username: 'kumelemuel',
      email: 'kumelemuel@gmail.com',
      password: '123456',
    };

    // const result = await command.execute(new SignUpCommand(data));

    const result = await authService.signUp(data);

    expect(result).toBeInstanceOf(Account);
  });
  /* it('should not register an account with an e-mail already in use', () => {
    expect(false).toBe(true);
  }); */
});
