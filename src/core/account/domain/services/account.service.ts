import { SignUpDto } from '@/core/account/application/dto/sign-up.dto';
import { Account } from '@/core/account/domain/entities/account';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  create(data: SignUpDto): Account {
    const account = new Account();
    account.username = data.username;
    account.email = data.email;
    account.password = data.password;
    return account;
  }
}
