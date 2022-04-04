import { KingdomError } from '@kingdom-sdk/core/dist/domain/exceptions/KingdomError';

export class RepositoryEntityManagerUnset extends KingdomError {
  public constructor() {
    super('Repository entity manager is unset', 'REPO_ENTITY_MANAGER_UNSET');
  }
}
