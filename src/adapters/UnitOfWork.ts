import { injectable, unmanaged } from 'inversify';
import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { Aggregate } from '@kingdom-sdk/core/dist/domain/models/Aggregate';
import { UnitOfWork } from '../ports/UnitOfWork';
import { DbTransactionNotStarted } from './exceptions/DbTransactionNotStarted';
import { DbConnectionNotEstablished } from './exceptions/DbConnectionNotEstablished';
import { TypeOrmRepository } from './Repository';

export interface RepositoryMap {
  [name: string]: TypeOrmRepository<any>;
}

@injectable()
export abstract class TypeOrmUnitOfWork implements UnitOfWork {
  private _queryRunner?: QueryRunner;

  private _repositories: RepositoryMap;

  public constructor(@unmanaged() repositories: RepositoryMap) {
    this._repositories = repositories;
  }

  public setConnection(dbConnection: Connection) {
    this._queryRunner = dbConnection.createQueryRunner();
  }

  public get queryRunner(): QueryRunner {
    if (!this._queryRunner) {
      throw new DbConnectionNotEstablished();
    }
    return this._queryRunner;
  }

  private get entityManager(): EntityManager {
    if (!this.queryRunner.isTransactionActive) {
      throw new DbTransactionNotStarted();
    }
    return this.queryRunner.manager;
  }

  public repository<T extends Aggregate<any>>(name: string): TypeOrmRepository<T> {
    return this._repositories[name];
  }

  public begin(): Promise<void> {
    return this.queryRunner.startTransaction();
  }

  public commit(): Promise<void> {
    return this.queryRunner.commitTransaction();
  }

  public rollback(): Promise<void> {
    return this.queryRunner.rollbackTransaction();
  }

  private initializeRepositories() {
    Object.keys(this._repositories).forEach(name => {
      this._repositories[name].setEntityManager(this.entityManager);
    });
  }

  public async run(work: () => Promise<void>) {
    await this.begin();

    this.initializeRepositories();

    try {
      await work();
      await this.commit();
    } catch (error) {
      await this.rollback();
      throw error;
    } finally {
      await this.queryRunner.release();
    }
  }
}
