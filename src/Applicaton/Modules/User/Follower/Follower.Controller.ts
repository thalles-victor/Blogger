import type {Request, Response} from 'express'
import { FollowerService } from './Follower.Service';
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  async handle(request: Request, response: Response) {
    const { payload, follow_id } = request.body;

    const result = await this.followerService.execute(payload.id, follow_id);

    return response.status(202).send(result.value)
  }
}