export type IUser = {
  name: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  lastVisited: Date;
};

export type ILogin = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  isVerified: boolean;
  userId: string;
  email: string;
  role: string;
  token: string;
};
