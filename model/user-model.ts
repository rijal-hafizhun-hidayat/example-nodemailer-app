import type { user } from "@prisma/client";

export type UserRequest = {
  email: string;
  password: string;
};

export type UserResponse = {
  id: number;
  email: string;
  created_at: Date;
  update_at: Date;
};

export function toUserResponse(user: user): UserResponse {
  return {
    id: user.id,
    email: user.email,
    created_at: user.created_at,
    update_at: user.updated_at,
  };
}
