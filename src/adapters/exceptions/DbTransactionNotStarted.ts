import { KingdomError } from '@kingdom-sdk/core/dist/domain/exceptions/KingdomError';

export class DbTransactionNotStarted extends KingdomError {
  public constructor() {
    super('Database transaction has not started', 'DB_TRANSACTION_NOT_STARTED');
  }
}
