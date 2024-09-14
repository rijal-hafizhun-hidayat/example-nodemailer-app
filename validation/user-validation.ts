import { string, z, type ZodType } from "zod";

export class UserValidation {
  static readonly UserRequest: ZodType = z.object({
    email: string().min(1).max(100).email(),
    password: string().min(1).max(100),
  });
}
