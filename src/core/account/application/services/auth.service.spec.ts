import { SignUpDto } from '@/core/account/application/dto/sign-up.dto';
import { Account } from '@/core/account/domain/entities/account';
import { AuthService } from '@/core/account/application/services/auth.service';
import { TestingModule, Test } from '@nestjs/testing';
import { AuthUsecases } from '@/core/account/application/ports/in/auth.usecases';
import { AppModule } from '@/app.module';

describe('Auth sign up use case', () => {
  let authService: AuthUsecases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    await module.init();
    authService = module.get<AuthService>(AuthService);
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
