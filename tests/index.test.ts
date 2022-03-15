import { getConnection } from 'typeorm';
import { startMappers } from '../src/database/orm';
import { createMyAggregate } from './resources/models/MyAggregate';
import { createMyEntity } from './resources/models/MyEntity';
import { TypeOrmUnitOfWork } from '../src/adapters/unit_of_work';
import { MyAggregateMapper } from './resources/orm';

beforeEach(async () => {
  await startMappers();
});

test('Store throgh uoe', async () => {
  const myEntity = createMyEntity('test one');
  const myAggregate = createMyAggregate(myEntity, 10);

  const connection = getConnection();
  const uow = new TypeOrmUnitOfWork(connection);

  await uow.run(() => {
    const repo = uow.entityManager.getRepository(MyAggregateMapper);
    repo.save(myAggregate);
  });
});
