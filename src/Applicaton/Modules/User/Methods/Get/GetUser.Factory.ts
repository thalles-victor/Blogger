import { UserRepositoryFromPrismaORM } from '../../../../../Infra/Repositories/Prisma/UserRepositoryFromPrisma'

import { GetUserController } from "./GetUser.Controller"
import { GetUserService } from "./GetUser.Service";

const userRepository = new UserRepositoryFromPrismaORM()

export const getUserController = new GetUserController(
  new GetUserService(userRepository)
);