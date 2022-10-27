import { hashSync } from 'bcrypt'
import { v4 as uuid_v4} from 'uuid'
import { RegisterUserDTO } from './RegisterUser.DTO';

export class RegisterUserEntity {
  id: string;

  name: string;
  email: string;
  profileName: string;
  password: string;
  age: number;
  isPublicEntity: boolean;

  createdAt: string;
  updatedAt: string;

  constructor(userDTO: RegisterUserDTO) {
    this.id = uuid_v4();

    this.name = userDTO.name
    this.email = userDTO.email
    this.profileName = userDTO.profileName;
    this.password = hashSync(userDTO.password, 12);
    this.age = userDTO.age
    this.isPublicEntity = userDTO.isPublicEntity;
  
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString() 
  }

}