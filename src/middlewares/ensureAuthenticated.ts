import { NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing");
  }

  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token,
      "89ba023086e37a345839e0c6a0d272eb"
    ) as IPayload;
    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("usuário não é valido");
    }
    next();
  } catch {
    throw new AppError("Invalid token");
  }
}
