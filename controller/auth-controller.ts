import type { NextFunction, Request, Response } from "express";
import type { ResetPasswordRequest } from "../model/auth-model";
import { AuthService } from "../service/auth-service";

export class AuthController {
  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const request: ResetPasswordRequest = req.body as ResetPasswordRequest;
      const result: any = await AuthService.resetPassword(request);

      return res.status(200).json({
        statusCode: 200,
        message: "send email success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
