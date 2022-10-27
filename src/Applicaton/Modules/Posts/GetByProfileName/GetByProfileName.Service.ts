import { IPostRepositoryContract } from "../../../../Infra/Core/contracts/IPostRepositoryContract";

import { Either, left, right } from '../../../Shared/Errors/Either'
import { CustomError } from '../../../Shared/Errors/CustomError'
import { GlobalPostEntity } from "../GlobalPostsEntity";
import { IUserRepositoryContract } from "../../../../Infra/Core/contracts/IUserRepositoryContract";

type GetByProfileNameServiceResponse = Either<CustomError, GlobalPostEntity[]>

export class GetByProfileNameService {
  constructor(
    private readonly postRepository: IPostRepositoryContract,
    private readonly userRepository: IUserRepositoryContract
  ) {}

  async execute(profileName: string): Promise<GetByProfileNameServiceResponse> {
    const posts = await this.postRepository.getByProfileName(profileName)

    const userExist = await this.userRepository.getByProfileName(profileName);

    if (!userExist) {
      return left(new CustomError("User not found", 404))
    }

    return right(posts)
  }
}