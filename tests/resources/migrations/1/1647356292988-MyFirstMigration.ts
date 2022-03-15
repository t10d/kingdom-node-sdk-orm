import { join } from 'path';
import { SqlMigration } from '../../../../src/database/migrations/SqlMigration';

export class MyFirstMigration1647356292988 extends SqlMigration {
  name = 'MyFirstMigration1647356292988';

  public constructor() {
    super(join(__dirname, 'up.sql'), join(__dirname, 'down.sql'));
  }
}
