import { SignUpDto } from '@/core/account/application/dto/sign-up.dto';

export class SignUpCommand {
  constructor(public readonly signUpDto: SignUpDto) {}
}
