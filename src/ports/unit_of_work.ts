export interface IUnitOfWork {
  run(work: () => void): Promise<void>; // eslint-disable-line no-unused-vars
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
