import { validate } from "class-validator";
import * as jwt from 'jsonwebtoken'

import { IUserRepositoryContract } from "../../../../../Infra/Core/contracts/IUserRepositoryContract";
import { RegisterUserDTO } from "./core/RegisterUser.DTO";
import { RegisterUserEntity } from "./core/RegisterUser.Entity";

import { Either, left, right } from '../../../../Shared/Errors/Either'
import { CustomError } from '../../../../Shared/Errors/CustomError';

type ReturnReponse = Either<CustomError, string>

export class RegisterUserService {
  constructor(private readonly userRepository: IUserRepositoryContract)  {}

  async execute(userDTO: RegisterUserDTO): Promise<ReturnReponse> {
    const registerUserDTO = Object.assign(new RegisterUserDTO(), userDTO);
    
    const errors = await validate(userDTO)
    if (errors.length > 0) {
      return left(new CustomError("Invalid type paramiters", 400, { errors }))
    }

    const profileNameIsUsed = await this.userRepository.getByProfileName(registerUserDTO.profileName);

    if (profileNameIsUsed) {
      return left(new CustomError("Profile name already use", 400))
    }

    const userAlreadyExist = await this.userRepository.getByEmail(userDTO.email);
    if (userAlreadyExist) {
      return left(new CustomError("Email already registered", 400))
    }

    
    const userEntity = new RegisterUserEntity(registerUserDTO);
    const user = await this.userRepository.register(userEntity);
  
    const payload = {
      id: user.id,
      email: user.email,
      profileName: user.profileName
    }

    const token = jwt.sign(
      payload,
      process.env.JWT_SCRET as string,
      { expiresIn: '1h' }
    )
  
    return right(token);
  }
}