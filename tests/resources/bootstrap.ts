import { Container } from 'inversify';
import { Repository } from '../../src/ports/Repository';
import { UnitOfWork } from '../../src/ports/UnitOfWork';
import { myTypes } from './config';
import { MyAggregate } from './models/MyAggregate';
import { MyAggregateRepository } from './repositories/MyAggregateRepository';
import { MyUOW } from './uow/MyUOW';

const myContainer = new Container();

myContainer.bind<Repository<MyAggregate>>(myTypes.MyAggregateRepository).to(MyAggregateRepository);
myContainer.bind<UnitOfWork>(myTypes.MyUOW).to(MyUOW);

export { myContainer };
