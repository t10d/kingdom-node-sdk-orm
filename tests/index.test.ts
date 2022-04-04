import { getConnection } from 'typeorm';
import { startMappers } from '../src/database/orm';
import { myRepos, myTypes } from './resources/config';
import { createMyAggregate } from './resources/models/MyAggregate';
import { createMyEntity } from './resources/models/MyEntity';
import { MyUOW } from './resources/uow/MyUOW';
import { myContainer } from './resources/bootstrap';

let uow: MyUOW;

beforeEach(async () => {
  await startMappers();
  uow = myContainer.get<MyUOW>(myTypes.MyUOW);
});

test('Store through uow', async () => {
  const myEntity = createMyEntity('test one');
  const myAggregate = createMyAggregate(myEntity, 10);

  uow.setConnection(getConnection());

  await uow.run(async () => {
    await uow.repository(myRepos.myAggregates).save(myAggregate);
  });
});
