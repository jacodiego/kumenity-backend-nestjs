import { Account } from '@/core/account/domain/entities/account';
import { SignUpDto } from '@/core/account/application/dto/sign-up.dto';

export interface AuthUsecases {
  signUp(data: SignUpDto): Promise<Account>;
  signIn(username: string, password: string): Promise<Account>;
  recoveryPassword(email: string): Promise<Account>;
}
