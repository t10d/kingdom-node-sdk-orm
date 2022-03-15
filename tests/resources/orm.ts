import { IMyAggregate } from './models/MyAggregate';
import { IMyEntity } from './models/MyEntity';
import { createAggregateTable, createEntityTable } from '../../src/database/factories';

export const MyEntityMapper = createEntityTable<IMyEntity>(
  'my_entities',
  /* @ts-ignore */
  {
    id: {
      type: 'int',
      primary: true,
      generated: 'increment',
    },
    name: {
      type: 'varchar',
      length: 255,
    },
  },
);

export const MyAggregateMapper = createAggregateTable<IMyAggregate>(
  'my_aggregates',
  /* @ts-ignore */
  {
    id: {
      type: 'int',
      primary: true,
      generated: 'increment',
    },
    counter: {
      type: 'int',
    },
  },
  {
    reference: {
      type: 'many-to-one',
      target: 'my_entities',
      joinColumn: {
        name: 'reference_id',
      },
      cascade: true,
    },
  },
);
