import { RegisterPostDTO } from "./CreatePost.DTO"
import { v4 as uuid_v4 } from 'uuid'

export class RegisterPostEntity {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  author_profileName: string

  constructor(
    {postDTO, profileName}
    :
    { postDTO: RegisterPostDTO, profileName: string}){
    this.id= uuid_v4()
    this.title=  postDTO.title;
    this.content=  postDTO.content;
    this.createdAt= new Date().toISOString();
    this.updatedAt=  new Date().toISOString();
    this.author_profileName=  profileName;
  }
}