import type { Request, Response } from 'express'

import { GetAllPostService } from "./GetAllPost.Service";

export class GetAllPostController {
  constructor(private readonly getAllPostService: GetAllPostService) {}

  async handle(request: Request, response: Response) {
    const result = await this.getAllPostService.execute();

    return response.json(result.value)
  }

}