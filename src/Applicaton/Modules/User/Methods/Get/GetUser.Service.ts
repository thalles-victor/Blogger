import { IUserRepositoryContract } from "../../../../../Infra/Core/contracts/IUserRepositoryContract";

import { Either, left, right } from '../../../../Shared/Errors/Either';
import { CustomError } from '../../../../Shared/Errors/CustomError';
import { GlobalUserEntity } from "../../GlobalUserEntity";

type ResultResponse = Either<CustomError, Omit<GlobalUserEntity, "password">>

export class GetUserService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async execute(id: string): Promise<ResultResponse> {
    let user = await this.userRepository.getById(id);

    if (!user) {
      return left(new CustomError("User not found", 400))
    }

    delete user.password
  
    return right(user);
  }
}