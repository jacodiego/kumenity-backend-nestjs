import { ApplicationException } from './aplication.error';

export class UsernameAlreadyRegisteredError extends ApplicationException {
  constructor(message: string) {
    super(message);
  }
}
