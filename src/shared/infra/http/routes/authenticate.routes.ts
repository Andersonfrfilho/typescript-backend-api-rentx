import { Router } from "express";

import { AuthenticatedUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateUsersRoutes = Router();

const createSpecificationController = new AuthenticatedUserController();

authenticateUsersRoutes.post("/session", createSpecificationController.handle);

export { authenticateUsersRoutes };
