export type IUser = {
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNo: number;
  image: string;
  birthday: Date;
};

export type ILogin = {
  email: string;
  password: string;
};
