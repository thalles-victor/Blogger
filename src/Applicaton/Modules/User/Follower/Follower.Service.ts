import { IUserRepositoryContract } from "../../../../Infra/Core/contracts/IUserRepositoryContract";

import { Either, left, right } from '../../../Shared/Errors/Either'
import { CustomError } from '../../../Shared/Errors/CustomError'

type FollowerResponse = Either<CustomError, string>

export class FollowerService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async execute(user_id: string, follow_id: string) {
    const alreadyFollower = await this.userRepository.getFollowSomeone(user_id, follow_id);

    if (alreadyFollower) {
      return left(new CustomError("Already follow this user", 400))
    }

    try {
      this.userRepository.followSomeone(user_id, follow_id);
    } catch(error) {
      console.log(error)
    }

    await this.userRepository.markFollower(follow_id, user_id)

    return right("seguindo");

    

  }
}