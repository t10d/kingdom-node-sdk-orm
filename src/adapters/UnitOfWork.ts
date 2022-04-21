import { injectable, unmanaged } from 'inversify';
import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { Entity } from '@kingdom-sdk/core/dist/domain/models/Entity';
import { UnitOfWork } from '../ports/UnitOfWork';
import { DbTransactionNotStarted } from './exceptions/DbTransactionNotStarted';
import { DbConnectionNotEstablished } from './exceptions/DbConnectionNotEstablished';
import { TypeOrmRepository } from './Repository';
import { QueryRunnerUnset } from './exceptions/QueryRunnerUnset';

export interface RepositoryMap {
  [name: string]: TypeOrmRepository<any>;
}

@injectable()
export abstract class TypeOrmUnitOfWork implements UnitOfWork {
  private _queryRunner?: QueryRunner;

  private _dbConnection?: Connection;

  private _repositories: RepositoryMap;

  public constructor(@unmanaged() repositories: RepositoryMap) {
    this._repositories = repositories;
  }

  public setConnection(dbConnection: Connection) {
    this._dbConnection = dbConnection;
  }

  public get queryRunner(): QueryRunner {
    if (!this._queryRunner) {
      throw new QueryRunnerUnset();
    }
    return this._queryRunner;
  }

  public get dbConnection(): Connection {
    if (!this._dbConnection) {
      throw new DbConnectionNotEstablished();
    }
    return this._dbConnection;
  }

  private get entityManager(): EntityManager {
    if (!this.queryRunner.isTransactionActive) {
      throw new DbTransactionNotStarted();
    }
    return this.queryRunner.manager;
  }

  public repository<T extends Entity<any>>(name: string): TypeOrmRepository<T> {
    return this._repositories[name];
  }

  public async begin(): Promise<void> {
    this._queryRunner = this.dbConnection.createQueryRunner();
    await this.queryRunner.startTransaction();
    this.initializeRepositories();
  }

  public async commit(): Promise<void> {
    await this.queryRunner.commitTransaction();
  }

  public async rollback(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
  }

  public async release(): Promise<void> {
    await this.queryRunner.release();
  }

  private initializeRepositories() {
    Object.keys(this._repositories).forEach(name => {
      this._repositories[name].setEntityManager(this.entityManager);
    });
  }

  public async run(work: () => Promise<void>) {
    await this.begin();

    try {
      await work();
      await this.commit();
    } catch (error) {
      await this.rollback();
      throw error;
    } finally {
      await this.release();
    }
  }
}
