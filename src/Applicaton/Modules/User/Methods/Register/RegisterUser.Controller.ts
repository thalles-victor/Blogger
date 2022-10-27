import type { Request, Response } from 'express';
import { RegisterUserService } from './RegisterUser.Service';

export class RegisterUserController {
  constructor(private readonly reigsterUserService: RegisterUserService) {}

  async handle(request: Request, response: Response) {
    const registerUserDTO = request.body;


    const result = await this.reigsterUserService.execute(registerUserDTO);

    if (result.isLeft()) {
      return response.status(result.value.statusCode).json({
        statusCode: result.value.statusCode,
        message: result.value.message,
        error: result.value.error
      })
    }

    return response.status(201).json({
      statusCode: 201,
      token: "Bearer " + result.value,
    })
  }
}