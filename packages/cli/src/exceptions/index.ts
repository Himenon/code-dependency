abstract class BaseCustomError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class SourceNotFoundError extends BaseCustomError {}
