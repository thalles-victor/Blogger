import { validate } from "class-validator";
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken'

import { IUserRepositoryContract } from "../../../../../Infra/Core/contracts/IUserRepositoryContract";
import { Either, left, right } from '../../../../Shared/Errors/Either';
import { CustomError } from '../../../../Shared/Errors/CustomError';
import { LoginUserDTO } from "./Core/LoginUser.DTO";

type ResultResponse = Either<CustomError, string>;

export class LoginUserService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async execute(userCredentials: LoginUserDTO): Promise<ResultResponse> {
    const userDTO = Object.assign(new LoginUserDTO(), userCredentials);

    /* Verify if parameters is valid */
    const paramiterErrros = await validate(userDTO);
    if (paramiterErrros.length > 0) {
      return left(new CustomError("Type Paramiter is invalid", 400, { paramiterErrros }))
    }


    const user = await this.userRepository.getByEmail(userDTO.email);

    if (!user) {
      return left(new CustomError("User unregistered", 400))
    }
    
    /* Check if the credentials is valid */
    const passwordIsValid = compareSync(userDTO.password, user.password );
    if (!passwordIsValid) {
      return left(new CustomError("Password invalid", 401))
    }

    const payload = {
      id: user.id,
      email: user.email,
      profileName: user.profileName
    }

    
    const token = sign(
      payload,
      process.env.JWT_SCRET as string,
      { expiresIn: '1h' }
    );

    console.log(token)
    return right(token)
  }
}