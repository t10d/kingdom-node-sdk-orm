import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { IUnitOfWork } from '../ports/unit_of_work';

export class TypeOrmUnitOfWork implements IUnitOfWork {
  private readonly asyncDatabaseConnection: Connection;

  private readonly queryRunner: QueryRunner;

  private _entityManager?: EntityManager | undefined;

  public constructor(asyncDatabaseConnection: Connection) {
    this.asyncDatabaseConnection = asyncDatabaseConnection;
    this.queryRunner = this.asyncDatabaseConnection.createQueryRunner();
  }

  public get entityManager(): EntityManager {
    if (!this._entityManager) {
      throw new Error('Transaction not started');
    }
    return this._entityManager;
  }

  public commit(): Promise<void> {
    return this.queryRunner.commitTransaction();
  }

  public rollback(): Promise<void> {
    return this.queryRunner.rollbackTransaction();
  }

  public async run(work: () => void) {
    await this.queryRunner.startTransaction();
    this._entityManager = this.queryRunner.manager;

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
