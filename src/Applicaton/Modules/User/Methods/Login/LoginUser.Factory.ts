import { UserRepositoryFromPrismaORM } from '../../../../../Infra/Repositories/Prisma/UserRepositoryFromPrisma';

import { LoginUserController } from "./LoginUser.Controller"
import { LoginUserService } from "./LoginUser.Service"

const userRepository = new UserRepositoryFromPrismaORM();

export const loginUserController = new LoginUserController(
  new LoginUserService(userRepository),
)