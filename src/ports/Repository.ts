import { Entity } from '@kingdom-sdk/core/dist/domain/models/Entity';

export interface Repository<T extends Entity<any>> {
  save(entity: T): Promise<void>; // eslint-disable-line no-unused-vars
  update(entity: T): Promise<void>; // eslint-disable-line no-unused-vars
  empty(): Promise<void>;
}
