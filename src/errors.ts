export class LLMApiRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LLMApiRequestError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class SmartToolManagerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SmartToolManagerError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
