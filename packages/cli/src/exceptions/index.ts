abstract class BaseCustomError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class SourcePathInvalidError extends BaseCustomError {}
