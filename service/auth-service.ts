import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import type { DataEmail, ResetPasswordRequest } from "../model/auth-model";
import { DateUtils } from "../utils/date-utils";
import { SendEmail } from "../utils/send-email";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";

export class AuthService {
  static async resetPassword(request: ResetPasswordRequest): Promise<any> {
    const requestBody: ResetPasswordRequest = Validation.validate(
      AuthValidation.ResetPasswordRequest,
      request
    );

    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (!isEmailExist) {
      throw new ErrorResponse(404, "email doesnt exist");
    }

    const token: number = Math.floor(1000 + Math.random() * 9000);

    const isPasswordResetExist = await prisma.password_reset.findUnique({
      where: {
        user_id: isEmailExist.id,
      },
    });

    if (isPasswordResetExist) {
      await prisma.$transaction([
        prisma.password_reset.delete({
          where: {
            user_id: isEmailExist.id,
          },
        }),
      ]);
    }

    const date = new Date();
    const expiredAt = await DateUtils.addMinutes(date, 10);

    await prisma.$transaction([
      prisma.password_reset.create({
        data: {
          user_id: isEmailExist.id,
          token: token,
          expired_at: expiredAt,
        },
      }),
    ]);

    const dataEmail: DataEmail = {
      from: "rijal.1344@gmail.com",
      to: isEmailExist.email,
      subject: "token reset password",
      text: `Dear ${isEmailExist.email}, here is the token reset password, ${token}`,
    };

    const sendMail = await SendEmail.send(dataEmail);

    return sendMail;
  }
}
