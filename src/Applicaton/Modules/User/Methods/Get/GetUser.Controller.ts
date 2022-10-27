import { Request, Response } from 'express'
import { GetUserService } from './GetUser.Service';

export class GetUserController {
  constructor(private readonly userService: GetUserService) {}

  async handle(request: Request, response: Response) {
    const payload: { id: string; email: string } = request.body.payload;

    const result = await this.userService.execute(payload.id);

    if (result.isLeft()) {
      return response.status(result.value.statusCode).json({
        statusCode: result.value.statusCode,
        message: result.value.message,
        error: result.value.error
      })
    }


    return response.status(200).json({
      data: result.value
    })
  }


}