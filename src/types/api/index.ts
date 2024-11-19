import { Roles } from '../enum';

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name?: string;
  roles: Array<Roles>;
};

export type AuthResponse = {
  success: boolean;
  data: User;
};

export type ApiError = {
  success: false;
  details: string | { [k: string]: Array<string> };
  code_name: string;
};
