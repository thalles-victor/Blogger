import { UserRepositoryFromPrismaORM } from '../../../../../Infra/Repositories/Prisma/UserRepositoryFromPrisma'

import { RegisterUserController } from './RegisterUser.Controller'
import { RegisterUserService } from './RegisterUser.Service'

const userRepository = new UserRepositoryFromPrismaORM();

export const registerUserController = new RegisterUserController(
  new RegisterUserService(userRepository)
)