import { AuthUsecases } from '../ports/in/auth.usecases';
import { CommandBus } from '@nestjs/cqrs';
import { SignUpCommand } from '../commands/sign-up.command';
import { Account } from '../../domain/entities/account';
import { Injectable } from '@nestjs/common';
import { SignUpDto } from '@/core/account/application/dto/sign-up.dto';

@Injectable()
export class AuthService implements AuthUsecases {
  constructor(private readonly commandBus: CommandBus) {}

  async recoveryPassword(email: string): Promise<Account> {
    return Promise.resolve(undefined);
  }

  async signIn(username: string, password: string): Promise<Account> {
    return Promise.resolve(undefined);
  }

  async signUp(data: SignUpDto): Promise<Account> {
    return this.commandBus.execute(new SignUpCommand(data));
  }
}
