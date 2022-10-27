
import { PostRoposiotyrFromPrisma } from "../../../../Infra/Repositories/Prisma/PostRoposiotyrFromPrisma"

import { CreatePostController } from './CreatePost.Controller'
import { CreatePostService } from './CreatePost.Service'

const userRepository = new PostRoposiotyrFromPrisma();

export const createPostContoller = new CreatePostController(
  new CreatePostService(userRepository)
)