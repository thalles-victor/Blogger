import { Router } from 'express';
import type { Request, Response } from 'express';
import { registerUserController } from '../../../Modules/User/Methods/Register/RegisterUser.Factory';
import { loginUserController } from '../../../Modules/User/Methods/Login/LoginUser.Factory';
import { getUserController } from '../../../Modules/User/Methods/Get/GetUser.Factory';
import { AuthMiddleware } from '../../../Shared/Middlewares/Auth';
import { createPostContoller } from '../../../Modules/Posts/CreatePost/CreatePost.Factory';
import { followerController } from '../../../Modules/User/Follower/Follower.Factory';

const userRouter = Router();


userRouter.get("/users", async (request: Request, response: Response) => {
  return response.send("users router")
})

userRouter.post("/register", async (request: Request, respnose: Response) => {
  return registerUserController.handle(request, respnose);
})

userRouter.post("/login", async (request: Request, respnose: Response) => {
  return loginUserController.handle(request, respnose);
})

userRouter.get("/", AuthMiddleware, async (request: Request, response: Response) => {
  return getUserController.handle(request, response);
})

userRouter.post("/post", AuthMiddleware, async (request: Request, response: Response) => {
  return createPostContoller.handle(request, response);
})

userRouter.get("/follower", AuthMiddleware, async (request: Request, response: Response) => {
  return followerController.handle(request, response)
});


userRouter.post("/")


export { userRouter };