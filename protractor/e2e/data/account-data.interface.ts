
export interface IAccount {
  email: string;
  password: string;

  firstName: string;
  lastName: string;
  userId: string;

  professionalHeadline: string;
  summary: string;
  hourRate: string;
}

export interface InvalidLoginData {
  invalidEmail: string;
  invalidPassword: string;
}
