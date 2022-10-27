import { Request, Response, Router } from 'express';
import { getAllPostController } from '../../../Modules/Posts/GetAll/GetAllPost.Factory';
import { getByProfileNameController } from '../../../Modules/Posts/GetByProfileName/GetByProfileName.Factory';


const postRouter = Router();

postRouter.get("/all", async (request: Request, response: Response) => {
  return getAllPostController.handle(request, response);
})

postRouter.get("/:profileName", async (request: Request, response: Response) => {
  return getByProfileNameController.handle(request, response);
})


export { postRouter };
