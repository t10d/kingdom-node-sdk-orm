import { Aggregate } from '@kingdom-sdk/core/dist/domain/models/Aggregate';
import { injectable, unmanaged } from 'inversify';
import typeorm, { EntityManager, EntitySchema } from 'typeorm';
import { Repository } from '../ports/Repository';
import { RepositoryEntityManagerUnset } from './exceptions/RepositoryEntityManagerUnset';

@injectable()
export abstract class TypeOrmRepository<T extends Aggregate<any>> implements Repository<T> {
  private _entityManager?: EntityManager;

  private readonly entitySchema: EntitySchema;

  public constructor(@unmanaged() entitySchema: EntitySchema) {
    this.entitySchema = entitySchema;
  }

  public setEntityManager(entityManager: EntityManager) {
    this._entityManager = entityManager;
  }

  private get entityManager(): EntityManager {
    if (!this._entityManager) {
      throw new RepositoryEntityManagerUnset();
    }
    return this._entityManager;
  }

  private get repository(): typeorm.Repository<any> {
    return this.entityManager.getRepository(this.entitySchema);
  }

  public async save(aggregate: T): Promise<void> {
    return this.repository.save(aggregate);
  }
}
