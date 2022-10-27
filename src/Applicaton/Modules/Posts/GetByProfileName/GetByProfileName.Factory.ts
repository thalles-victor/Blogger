import { PostRoposiotyrFromPrisma } from '../../../../Infra/Repositories/Prisma/PostRoposiotyrFromPrisma'
import { UserRepositoryFromPrismaORM } from '../../../../Infra/Repositories/Prisma/UserRepositoryFromPrisma'

import { GetByProfileNameController } from "./GetByProfileName.Controller"
import { GetByProfileNameService } from "./GetByProfileName.Service"

const postRepository = new PostRoposiotyrFromPrisma();
const userRepository = new UserRepositoryFromPrismaORM()

export const getByProfileNameController = new GetByProfileNameController(
  new GetByProfileNameService(postRepository, userRepository)
)