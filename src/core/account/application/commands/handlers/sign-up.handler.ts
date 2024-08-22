import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountService } from '@/core/account/domain/services/account.service';
import { SignUpCommand } from '@/core/account/application/commands/sign-up.command';
import { AccountRepository } from '@/core/account/application/ports/out/account.repository';
import { Account } from '@/core/account/domain/entities/account';
import { UsernameAlreadyRegisteredError } from '@/core/account/application/exceptions/username-already-registered.error';
import { EmailAlreadyRegisteredError } from '@/core/account/application/exceptions/email-already-registered.error';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly repository: AccountRepository,
    private readonly accountService: AccountService,
  ) {}

  async execute(command: SignUpCommand): Promise<Account> {
    if (await this.repository.usernameExists(command.signUpDto.username)) {
      throw new UsernameAlreadyRegisteredError(
        'This username is already registered',
      );
    }
    if (await this.repository.emailExists(command.signUpDto.email)) {
      throw new EmailAlreadyRegisteredError('This email is already registered');
    }
    const account = this.accountService.create(command.signUpDto);
    const saved = await this.repository.create(account);
    return Promise.resolve(saved);
  }
}
