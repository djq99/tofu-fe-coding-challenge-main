export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public endpoint: string,
    public responseData?: any
  ) {
    super(message);
    this.name = "APIError";
  }
}
