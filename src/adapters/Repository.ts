import { Entity } from '@kingdom-sdk/core/dist/domain/models/Entity';
import { injectable, unmanaged } from 'inversify';
import typeorm, { EntityManager, EntitySchema } from 'typeorm';
import { Repository } from '../ports/Repository';
import { RepositoryEntityManagerUnset } from './exceptions/RepositoryEntityManagerUnset';

@injectable()
export abstract class TypeOrmRepository<T extends Entity<any>> implements Repository<T> {
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

  public async save(entity: T): Promise<void> {
    await this.repository.save(entity);
  }

  public async update(entity: T): Promise<void> {
    await this.repository.update({ id: entity.id }, entity.props);
  }

  public async delete(entity: T): Promise<void> {
    await this.repository.delete(entity.id);
  }

  public async empty(): Promise<void> {
    await this.repository.clear();
  }
}
