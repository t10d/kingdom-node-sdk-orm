import { Aggregate } from '@kingdom-sdk/core/dist/domain/models/Aggregate';

export interface Repository<T extends Aggregate<any>> {
  save(aggregate: T): Promise<void>; // eslint-disable-line no-unused-vars
}
