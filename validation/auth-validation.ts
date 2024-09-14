import { string, z, type ZodType } from "zod";

export class AuthValidation {
  static readonly ResetPasswordRequest: ZodType = z.object({
    email: string().min(1).max(100).email(),
  });
}
