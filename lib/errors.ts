export class CustomError extends Error {
  public statusCode: number;
  public errorResult: { [key: string]: string };
  constructor(errorResult: { [key: string]: string }, statusCode: number) {
    super();
    this.statusCode = statusCode;
    this.errorResult = errorResult;
  }
}
