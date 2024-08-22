import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('account')
export class AccountEntity {
  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ default: false })
  activated: boolean;

  constructor(account: Partial<AccountEntity>) {
    Object.assign(this, account);
  }
}
