export interface CreateUser {
  name: string;
  email: string;
  password: string;
  role?: string;
  isVerify?: boolean;
}

export interface LoginUser {
  email: string;
  password: string;
}
