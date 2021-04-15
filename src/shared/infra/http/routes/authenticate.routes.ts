import { Router } from "express";

import { AuthenticatedUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateUsersRoutes = Router();

const createSpecificationController = new AuthenticatedUserController();
const refreshTokenController = new RefreshTokenController();

authenticateUsersRoutes.post("/sessions", createSpecificationController.handle);
authenticateUsersRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateUsersRoutes };
