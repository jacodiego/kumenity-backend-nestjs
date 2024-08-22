import { AccountEntity } from '@/infrastructure/adapters/persistence/account/account.entity';
import { Injectable } from '@nestjs/common';
import { Account } from '@/core/account/domain/entities/account';

@Injectable()
export class AccountMapper {
  constructor() {}

  static fromDomain(entity: Account): AccountEntity {
    return undefined;
  }

  static toDomain(entity: AccountEntity): Account {
    const account = new Account();
    account.id = entity.id.toHexString();
    account.username = entity.username;
    account.email = entity.email;
    account.password = entity.password;
    account.activated = entity.activated;
    return account;
  }
}
