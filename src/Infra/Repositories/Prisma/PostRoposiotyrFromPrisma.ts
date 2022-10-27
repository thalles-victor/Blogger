import { Prisma, PrismaClient } from "@prisma/client";
import { RegisterPostEntity } from "../../../Applicaton/Modules/Posts/CreatePost/Core/CreatePost.Entity";
import { GlobalPostEntity } from "../../../Applicaton/Modules/Posts/GlobalPostsEntity";
import { IPostRepositoryContract } from "../../Core/contracts/IPostRepositoryContract";

export class PostRoposiotyrFromPrisma implements IPostRepositoryContract {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async createPost(postEntity: RegisterPostEntity): Promise<void> {
    await this.prismaClient.post.create({
      data: {
        ...postEntity,
      },
    })
  }

  async getByProfileName(profileName: string): Promise<GlobalPostEntity[]> {
    const posts = this.prismaClient.post.findMany({
      where: {
        author_profileName: profileName,
      }
    })

    return posts;
  }

  async getAll(): Promise<GlobalPostEntity[]> {
    const posts = await this.prismaClient.post.findMany()

    return posts;
  }

  async getAllPosts(id: string): Promise<GlobalPostEntity[]> {
    const posts = await this.prismaClient.post.findMany();
    
    return posts;
  }

  getByFollower(id: string): Promise<GlobalPostEntity[]> {
    return null;
  }


}