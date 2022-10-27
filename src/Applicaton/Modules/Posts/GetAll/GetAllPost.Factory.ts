import { PostRoposiotyrFromPrisma } from '../../../../Infra/Repositories/Prisma/PostRoposiotyrFromPrisma';
import { GetAllPostController } from './GetAllPost.Controller';
import { GetAllPostService } from './GetAllPost.Service';

const postRepository = new PostRoposiotyrFromPrisma();

export const getAllPostController = new GetAllPostController(
  new GetAllPostService(postRepository)
)