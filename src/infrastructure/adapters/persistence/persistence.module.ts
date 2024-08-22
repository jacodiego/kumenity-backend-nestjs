import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '@/infrastructure/shared/config/database.config';
import { AccountEntity } from '@/infrastructure/adapters/persistence/account/account.entity';
import { MongoDbAccountRepository } from '@/infrastructure/adapters/persistence/account/mongodb-account.repository';
import { AuthService } from '@/core/account/application/services/auth.service';
import { CommandBus } from '@nestjs/cqrs';

export const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const database = config.get<DatabaseConfig>('database');
        return {
          type: 'mongodb',
          host: database.host,
          port: database.port,
          username: database.user,
          password: database.password,
          database: database.name,
          entities: [AccountEntity],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([AccountEntity]),
  ],
  providers: [
    {
      provide: ACCOUNT_REPOSITORY,
      useExisting: MongoDbAccountRepository,
    },
    MongoDbAccountRepository,
    AuthService,
    CommandBus,
  ],
  exports: [ACCOUNT_REPOSITORY],
})
export class PersistenceModule {}
