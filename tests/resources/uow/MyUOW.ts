import { inject, injectable } from 'inversify';
import { TypeOrmUnitOfWork, RepositoryMap } from '../../../src/adapters/UnitOfWork';
import { MyAggregateRepository } from '../repositories/MyAggregateRepository';
import { myRepos, myTypes } from '../config';

@injectable()
export class MyUOW extends TypeOrmUnitOfWork {
  public constructor(@inject(myTypes.MyAggregateRepository) myAggregates: MyAggregateRepository) {
    const repositories: RepositoryMap = {};
    repositories[myRepos.myAggregates] = myAggregates;
    super(repositories);
  }
}
