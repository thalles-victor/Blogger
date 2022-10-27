export class CustomError extends Error {
  errorMessage: string;
  statusCode: number;
  error?: object


  constructor(message: string, statusCode: number, error?: object) {
    super(message)
    this.errorMessage = message;
    this.statusCode = statusCode;
    this.error = error;
  }

}