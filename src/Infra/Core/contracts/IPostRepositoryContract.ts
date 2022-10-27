import { RegisterPostEntity } from "../../../Applicaton/Modules/Posts/CreatePost/Core/CreatePost.Entity";
import { GlobalPostEntity } from "../../../Applicaton/Modules/Posts/GlobalPostsEntity";

export interface IPostRepositoryContract {
  createPost(postEntity: RegisterPostEntity): Promise<void>
  getAll(): Promise<GlobalPostEntity[]>
  getByFollower(id: string): Promise<GlobalPostEntity[]>;
  getByProfileName(profileName: string): Promise<GlobalPostEntity[]>;
}