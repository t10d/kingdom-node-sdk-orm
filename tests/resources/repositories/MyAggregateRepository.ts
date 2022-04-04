import { injectable } from 'inversify';
import { TypeOrmRepository } from '../../../src/adapters/Repository';
import { MyAggregate } from '../models/MyAggregate';
import { MyAggregateMapper } from '../orm';

@injectable()
export class MyAggregateRepository extends TypeOrmRepository<MyAggregate> {
  public constructor() {
    super(MyAggregateMapper);
  }
}
