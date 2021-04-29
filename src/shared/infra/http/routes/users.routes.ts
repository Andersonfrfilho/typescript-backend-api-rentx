import { request, response, Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";
import * as io from "socket.io"
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { celebrate, Segments, Joi } from 'celebrate';
const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();


usersRoutes.post("/",
celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date(),
  },
}), createUserController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);
usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle
)
usersRoutes.get("/",async (request: Request, response: Response):Promise<Response> =>{

  request.io.to(request.connected_users['07d115e8-6954-4824-bd91-717cbc3fa5c3']).emit("notification","esse veio")
  return response.json({api:true});
}
)
export { usersRoutes };
