import { EntitySchema, EntitySchemaColumnOptions, EntitySchemaRelationOptions } from 'typeorm';
import { IEntity } from '@kingdom-sdk/core/dist/domain/models/Entity';
import { IAggregate } from '@kingdom-sdk/core/dist/domain/models/Aggregate';

type TableColumns<T> = {
  [P in keyof T]: EntitySchemaColumnOptions; // eslint-disable-line no-unused-vars
};

type TableRelations<T> = {
  [P in keyof T]: EntitySchemaRelationOptions; // eslint-disable-line no-unused-vars
};

export function createEntityTable<T extends IEntity<any>>(
  name: string,
  columns: TableColumns<T>,
  relations?: TableRelations<T>,
  schema?: string,
): EntitySchema {
  return new EntitySchema<T>({
    name,
    columns: {
      ...columns, // You have to specify the id by yourself
      version: {
        type: 'int',
      },
      isDiscarded: {
        type: 'tinyint',
        name: 'is_discarded',
      },
      registeredAt: {
        type: 'timestamp',
        name: 'registered_at',
      },
      updatedAt: {
        type: 'timestamp',
        name: 'updated_at',
      },
    },
    relations,
    schema,
    database: schema,
  });
}

export function createAggregateTable<T extends IAggregate<any>>(
  name: string,
  columns: TableColumns<T>,
  relations?: TableRelations<T>,
  schema?: string,
) {
  return createEntityTable(name, columns, relations, schema);
}

export function createRelationshipTable<T = any>(
  name: string,
  columns: TableColumns<T>,
  relations?: TableRelations<T>,
  schema?: string,
) {
  return new EntitySchema<T>({
    name,
    columns,
    relations,
    schema,
    database: schema,
  });
}
