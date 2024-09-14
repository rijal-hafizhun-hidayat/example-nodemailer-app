import type { NextFunction, Request, Response } from "express";
import type { UserRequest, UserResponse } from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {
  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UserRequest = req.body as UserRequest;
      const result: UserResponse = await UserService.store(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
