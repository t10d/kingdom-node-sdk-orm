import { KingdomError } from '@kingdom-sdk/core/dist/domain/exceptions/KingdomError';

export class QueryRunnerUnset extends KingdomError {
  public constructor() {
    super('Database query runner unset', 'DB_QUERY_RUNNER_UNSET');
  }
}
