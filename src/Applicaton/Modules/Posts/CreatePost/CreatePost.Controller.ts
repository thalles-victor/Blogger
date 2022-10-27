import type { Request, Response } from "express";
import { CreatePostService } from "./CreatePost.Service";

export class CreatePostController {
  constructor(private readonly createPostService: CreatePostService) {}

  async handle(request: Request, response: Response) {
    const { payload } = request.body;
    const { post } = request.body;
    console.log(post)

    const result = await this.createPostService.execute(post, payload.profileName);

    if (result.isLeft()){
      return response.status(result.value.statusCode).json({
        statusCode: result.value.statusCode,
        message: result.value.message,
        error: result.value.error
      })
    }

    return response.status(201).json({
      statusCode: 201,
      message: result.value
    })
  }
}