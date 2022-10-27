import type { Request, Response } from 'express'
import { GetByProfileNameService } from "./GetByProfileName.Service";

export class GetByProfileNameController {
  constructor(private readonly getByProfileNameService: GetByProfileNameService) {}

  async handle(request: Request, response: Response) {
    const { profileName } = request.params;

    const result = await this.getByProfileNameService.execute(profileName);

    if (result.isLeft()) {
      return response.status(result.value.statusCode).json({
        statusCode: result.value.statusCode,
        message: result.value.message,
        error: result.value.error
      })
    }
    
    return response.json(result.value)
  }
}