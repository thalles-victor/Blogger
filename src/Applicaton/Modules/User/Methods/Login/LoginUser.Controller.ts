import { Request, Response } from 'express';
import { LoginUserService } from './LoginUser.Service';

export class LoginUserController {
  constructor(private readonly loginUserService: LoginUserService) {}

  async handle(request: Request, response: Response) {
    const userCredentials = request.body;

    const result = await this.loginUserService.execute(userCredentials);

    if (result.isLeft()) {
      return response.status(result.value.statusCode).json({
        statusCode: result.value.statusCode,
        message: result.value.message,
        error: result.value.error
      })
    }

    return response.status(200).json({
      token: "Bearer " + result.value,
    })
  }
}