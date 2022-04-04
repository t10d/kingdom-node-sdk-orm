import { Aggregate } from '@kingdom-sdk/core/dist/domain/models/Aggregate';
import { Repository } from './Repository';

export interface UnitOfWork {
  repository<T extends Aggregate<any>>(name: string): Repository<T>; // eslint-disable-line no-unused-vars
  run(work: () => Promise<void>): Promise<void>; // eslint-disable-line no-unused-vars
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}