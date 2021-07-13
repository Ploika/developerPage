import { IHobby } from "./hobby";

export interface IUser {
  firstName: string,
  lastName: string,
  dateOfBirth: string
  framework: string
  frameworkVersion: string,
  email: string,
  hobby: IHobby
}
