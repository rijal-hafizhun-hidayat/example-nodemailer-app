import { prisma } from "../app/database";
import {
  toUserResponse,
  type UserRequest,
  type UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";

export class UserService {
  static async store(request: UserRequest): Promise<UserResponse> {
    const requestBody: UserRequest = Validation.validate(
      UserValidation.UserRequest,
      request
    );

    const passwordHased = await Bun.password.hash(requestBody.password);

    const [user] = await prisma.$transaction([
      prisma.user.create({
        data: {
          email: requestBody.email,
          password: passwordHased,
        },
      }),
    ]);

    return toUserResponse(user);
  }
}
