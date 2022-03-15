import { Entity, IEntity } from '@kingdom-sdk/core/dist/domain/models/Entity';

export interface IMyEntity extends IEntity<number> {
  name: string;
}

export class MyEntity extends Entity<number> implements IMyEntity {
  private _name: string;

  public constructor(
    id: number | undefined,
    version: number,
    isDiscarded: boolean,
    registeredAt: Date,
    updatedAt: Date,
    name: string,
  ) {
    super(id, version, isDiscarded, registeredAt, updatedAt);
    this._name = name;
  }

  override toString(): string {
    return this.baseRepr(this.id.toString(), { name: this._name });
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }
}

export function createMyEntity(name: string): MyEntity {
  const now = new Date();
  return new MyEntity(undefined, 0, false, now, now, name);
}
