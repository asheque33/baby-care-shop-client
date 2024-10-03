export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: string;
}
export interface ILoggedInUser {
  email: string;
  password: string;
}
