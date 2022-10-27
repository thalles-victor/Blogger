import { IUserRepositoryContract } from "../../../../Infra/Core/contracts/IUserRepositoryContract";
import { RegisterPostDTO } from "./Core/CreatePost.DTO";
import { RegisterPostEntity } from "./Core/CreatePost.Entity";

import { Either, left, right } from "../../../Shared/Errors/Either"
import { CustomError } from "../../../Shared/Errors/CustomError"
import { validate } from "class-validator";
import { IPostRepositoryContract } from "../../../../Infra/Core/contracts/IPostRepositoryContract";

type CreatePostResponse = Either<CustomError, string>

export class CreatePostService {
  constructor(private readonly postRepository: IPostRepositoryContract) {}

  async execute(postDTO: RegisterPostDTO, profileName: string): Promise<CreatePostResponse> {
    const postRequestDTO = Object.assign(new RegisterPostDTO(), postDTO);

    const erros = await validate(postRequestDTO);

    if (erros.length > 0) {
      return left(new CustomError("Paramiter invalid", 400, { erros }))
    }

    const postEntity = new RegisterPostEntity({postDTO, profileName})



    await this.postRepository.createPost(postEntity);

    return right("created");
  }
}