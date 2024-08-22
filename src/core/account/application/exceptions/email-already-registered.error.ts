import { ApplicationException } from './aplication.error';

export class EmailAlreadyRegisteredError extends ApplicationException {
  constructor(message: string) {
    super(message);
  }
}
