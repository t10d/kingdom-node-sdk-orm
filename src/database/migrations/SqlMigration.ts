import { MigrationInterface, QueryRunner } from 'typeorm';
import { readFileSync } from 'fs';

export abstract class SqlMigration implements MigrationInterface {
  private _upsPath: string;

  private _downsPath: string;

  /**
   * Configure the 'up.sql' and 'down.sql' absolute paths.
   */
  public constructor(upsPath: string, downsPath: string) {
    this._upsPath = upsPath;
    this._downsPath = downsPath;
  }

  private static async executeSqlFile(filepath: string, queryRunner: QueryRunner): Promise<void> {
    const fp = readFileSync(filepath);
    fp.toString()
      .split(';')
      .forEach(async statement => {
        if (statement.trim().length > 0) {
          await queryRunner.query(statement);
        }
      });
  }

  public up(queryRunner: QueryRunner): Promise<any> {
    return SqlMigration.executeSqlFile(this._upsPath, queryRunner);
  }

  public down(queryRunner: QueryRunner): Promise<any> {
    return SqlMigration.executeSqlFile(this._downsPath, queryRunner);
  }
}
