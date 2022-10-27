import { GlobalPostEntity } from "../../../Applicaton/Modules/Posts/GlobalPostsEntity";
import { GlobalUserEntity } from "../../../Applicaton/Modules/User/GlobalUserEntity";
import { RegisterUserDTO } from "../../../Applicaton/Modules/User/Methods/Register/core/RegisterUser.DTO";
import { RegisterUserEntity } from "../../../Applicaton/Modules/User/Methods/Register/core/RegisterUser.Entity";
import { RegisterPostEntity } from "../../../Applicaton/Modules/Posts/CreatePost/Core/CreatePost.Entity";
import { Followers, Following } from "@prisma/client";

export interface IUserRepositoryContract {
  register(userEntity: RegisterUserEntity): Promise<GlobalUserEntity>;
  getByEmail(email: string): Promise<GlobalUserEntity | null>;
  getById(id: string): Promise<GlobalUserEntity | null>;
  getPostsByAuthorProfileName(author_profileName: string): Promise<GlobalPostEntity[]>;
  followSomeone(user_id: string, follow_id: string): Promise<void>;
  getFollowSomeone(user_id: string, following_id: string): Promise<Following | null>;
  markFollower(user_id: string, follower_id: string): Promise<void>;
  getByProfileName(profileName: string): Promise<GlobalUserEntity | null>
}