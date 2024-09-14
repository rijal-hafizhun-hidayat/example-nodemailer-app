export type ResetPasswordRequest = {
  email: string;
};

export type DataEmail = {
  from: string;
  to: string;
  subject: string;
  text: string;
};
