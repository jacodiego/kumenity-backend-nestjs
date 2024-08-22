import { Account } from '@/core/account/domain/entities/account';

export interface AccountRepository {
  create(account: Account): Promise<Account>;
  login(username: string, password: string): Promise<Account>;
  emailExists(email: string): Promise<boolean>;
  usernameExists(username: string): Promise<boolean>;
}
