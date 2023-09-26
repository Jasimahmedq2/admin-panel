export type IUser = {
  name: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  phoneNo: string;
  image: string;
  birthday: string;
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
