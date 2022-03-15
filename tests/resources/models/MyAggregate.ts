import { Aggregate, IAggregate } from '@kingdom-sdk/core/dist/domain/models/Aggregate';
import { MyEntity } from './MyEntity';

export interface IMyAggregate extends IAggregate<number> {
  reference: MyEntity;
  counter: number;
}

export class MyAggregate extends Aggregate<number> implements IMyAggregate {
  private _reference: MyEntity;

  private _counter: number;

  public constructor(
    id: number | undefined,
    version: number,
    isDiscarded: boolean,
    registeredAt: Date,
    updatedAt: Date,
    reference: MyEntity,
    counter: number,
  ) {
    super(id, version, isDiscarded, registeredAt, updatedAt);
    this._counter = counter;
    this._reference = reference;
  }

  override toString(): string {
    return this.baseRepr(this.id.toString());
  }

  public get reference(): MyEntity {
    return this._reference;
  }

  public get counter(): number {
    return this._counter;
  }

  public set counter(value: number) {
    this._counter = value;
  }
}

export function createMyAggregate(reference: MyEntity, counter: number): MyAggregate {
  const now = new Date();
  return new MyAggregate(undefined, 0, false, now, now, reference, counter);
}
