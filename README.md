# 🏰 Kingdom SDK: ORM module

ORM module to provide persistence to DDD applications in TypeScript through a relational database.

## Features

See the [changelog](./CHANGELOG.md) to know all the features supported.

## Installation

Use the package manager [npm](https://npmjs.org) to install `@kingdom-sdk/orm`.

```bash
npm install @kingdom-sdk/orm
```

You can use [yarn](https://yarnpkg.com/) as well.

```bash
yarn add @kingdom-sdk/orm
```

## Development Dependencies

- [**TypeScript**](https://www.npmjs.com/package/typescript): Add support to static typing.
- [**TS node**](https://www.npmjs.com/package/ts-node): TypeScript interactive shell (REPL).
- [**TS config paths**](https://www.npmjs.com/package/tsconfig-paths): Simplify imports using an custom "@".
- [**ESLint**](https://www.npmjs.com/package/eslint): Style and code enforcement.
- [**Prettier**](https://www.npmjs.com/package/prettier): Style enforcement.
- [**Babel**](https://www.npmjs.com/package/@babel/core): JS compiler.
- [**Husky**](https://www.npmjs.com/package/husky): Git hooks utility (pre-commit).
- [**Lint staged**](https://www.npmjs.com/package/lint-staged): Run style check only for staged files (pre-commit).
- [**Jest**](https://www.npmjs.com/package/jest): Testing framework.

## Production Dependencies

- [**Kingdom SDK Core**](https://www.npmjs.com/package/@kingdom-sdk/core): DDD domain models.
- [**Inversify**](https://www.npmjs.com/package/inversify): Dependency injection.
- [**TypeORM**](https://www.npmjs.com/package/typeorm): ORM framework.
- [**Reflect metadata**](https://www.npmjs.com/package/reflect-metadata): Metadata reflection required by TypeORM.

## Adding a Git hook

After installing the dependencies, automatically the script `prepare` will set up the husky to git hooks.

To add a script to be run before every commit (such as code enforcement), follow the example below or edit by hand the [`pre-commit`](.husky/pre-commit) file.

```bash
yarn husky add .husky/pre-commit "yarn lint-staged"
```

## REPL

You can test sorts of TypeScript code interactively through the `ts-node` executable:

```bash
yarn ts-node
```

## Setup a database

This is a wrapper to TypeORM, you have to install the database driver as dependencys and configure the environment variable `TYPEORM_CONNECTION`.

Follow the cheat-sheet to match your needs:

| Database | Driver (npm package) | TYPEORM_CONNECTION |
|---|---|---|
| MySQL | [`mysql`](https://www.npmjs.com/package/mysql) | `mysql` |
| MariaDB | [`mysql`](https://www.npmjs.com/package/mysql) | `mariadb` |
| PostgreSQL | [`pg`](https://www.npmjs.com/package/pg) | `postgres` |
| CockroachDB | [`pg`](https://www.npmjs.com/package/pg) | `cockroachdb` |
| SQLite | [`sqlite3`](https://www.npmjs.com/package/sqlite3) | `sqlite` |

See the [TypeORM documentation](https://typeorm.io/) to check other supported databases.

## Database Migrations

- To create manually:

```bash
typeorm migration:create -n <name-without-spaces>
```

- To auto-generate according to models:

```bash
// typeorm migration:generate -n <name-without-spaces>
```

- To run the pending migrations:

```bash
// typeorm migration:run
```

- To revert the last migration:

```bash
// typeorm migration:revert
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
