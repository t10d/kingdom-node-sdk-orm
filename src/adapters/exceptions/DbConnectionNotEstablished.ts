import { KingdomError } from '@kingdom-sdk/core/dist/domain/exceptions/KingdomError';

export class DbConnectionNotEstablished extends KingdomError {
  public constructor() {
    super('Database connection has not established', 'DB_CONNECTION_NOT_ESTABLISHED');
  }
}
