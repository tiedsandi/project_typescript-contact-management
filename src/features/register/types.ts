export type RegisterForm = {
  username: string;
  name: string;
  password: string;
  confirm_password: string;
};

export const fields: (keyof RegisterForm)[] = [
  "username",
  "name",
  "password",
  "confirm_password",
];
