import { UserRepositoryFromPrismaORM } from '../../../../Infra/Repositories/Prisma/UserRepositoryFromPrisma';

import { FollowerController } from "./Follower.Controller"
import { FollowerService } from "./Follower.Service"

const userRepository = new UserRepositoryFromPrismaORM()

export const followerController = new FollowerController(
  new FollowerService(
    userRepository
  )
)