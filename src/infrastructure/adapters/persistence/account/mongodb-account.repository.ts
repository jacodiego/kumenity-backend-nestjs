import { AccountRepository } from '@/core/account/application/ports/out/account.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '@/infrastructure/adapters/persistence/account/account.entity';
import { MongoRepository } from 'typeorm';
import { Account } from '@/core/account/domain/entities/account';
import { AccountMapper } from '@/infrastructure/adapters/persistence/account/mapper/account.mapper';

@Injectable()
export class MongoDbAccountRepository implements AccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private repository: MongoRepository<AccountEntity>,
  ) {}

  async create(account: Account): Promise<Account> {
    const entity = await this.repository.save(
      new AccountEntity({
        email: account.email,
        password: account.password,
        username: account.username,
      }),
    );
    return Promise.resolve(AccountMapper.toDomain(entity));
  }

  async emailExists(email: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  async login(username: string, password: string): Promise<Account> {
    return Promise.resolve(undefined);
  }

  async usernameExists(username: string): Promise<boolean> {
    return Promise.resolve(false);
  }
}
