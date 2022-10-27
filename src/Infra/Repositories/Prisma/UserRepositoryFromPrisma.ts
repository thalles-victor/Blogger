import { Followers, Following, PrismaClient } from "@prisma/client"
import { GlobalPostEntity } from "../../../Applicaton/Modules/Posts/GlobalPostsEntity";
import { GlobalUserEntity } from "../../../Applicaton/Modules/User/GlobalUserEntity";
import { RegisterPostEntity } from "../../../Applicaton/Modules/Posts/CreatePost/Core/CreatePost.Entity";
import { RegisterUserEntity } from "../../../Applicaton/Modules/User/Methods/Register/core/RegisterUser.Entity";
import { IUserRepositoryContract } from "../../Core/contracts/IUserRepositoryContract";

export class UserRepositoryFromPrismaORM implements IUserRepositoryContract{
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient()
  }

  async getByProfileName(profileName: string): Promise<GlobalUserEntity | null> {
    const user = this.prismaClient.user.findUnique({
      where: { profileName: profileName }
    })

    return user;
  }

  async register(userEntity: RegisterUserEntity): Promise<GlobalUserEntity> {
    const user = await this.prismaClient.user.create({
      data: userEntity
    })

    return user;
  }

  async getByEmail(email: string): Promise<GlobalUserEntity | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { email }
    })

    return user;
  }

  async getById(id: string): Promise<GlobalUserEntity | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { id }
    })

    return user;
  }

  async getPostsByAuthorProfileName(author_profileName: string): Promise<GlobalPostEntity[]> {
    const posts = await this.prismaClient.post.findMany({ where: { author_profileName }});

    return posts;
  }

  async followSomeone(user_id: string, follow_id: string): Promise<void> {
    await this.prismaClient.user.update({
      where: {
        id: user_id
      },
      data: {
        following: {
          connectOrCreate: {
            create: {
              id: follow_id
            },
            where: {
              id: user_id
            }
          }  
        }
      }
    })
  }

  async markFollower(user_id: string, follower_id: string): Promise<void> {
    await this.prismaClient.user.update({
      where: {
        id: user_id
      },
      data: {
       followers: {
        connectOrCreate: {
          create: {
            id: follower_id
          },
          where: {
            id: user_id
          }
        }
       } 
      }
    }) 
  }

  async getFollowSomeone(user_id: string, following_id: string): Promise<Following | null> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        id: user_id
      },
      include: {
        following: true,
      }
    })

    const followSomeOne = user.following.find((follow) => follow.id === following_id);

    if (!followSomeOne) return null;

    return followSomeOne;
  }
}

