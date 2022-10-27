import { Either, left, right } from '../../../Shared/Errors/Either'
import { CustomError } from '../../../Shared/Errors/CustomError'
import { GlobalPostEntity } from '../GlobalPostsEntity'
import { IPostRepositoryContract } from '../../../../Infra/Core/contracts/IPostRepositoryContract'

type GetAllPostResponse = Either<CustomError, GlobalPostEntity[]>

export class GetAllPostService {
  constructor(private readonly postRepository: IPostRepositoryContract) {}

  async execute(): Promise<GetAllPostResponse> {
    const posts = await this.postRepository.getAll();

    return right(posts);
  }
}