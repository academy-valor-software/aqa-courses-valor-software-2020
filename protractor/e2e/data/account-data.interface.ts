
export interface WrongAccountData {
  wrongEmail: string;
  wrongPassword: string;
}

export interface IAccount extends WrongAccountData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userId: string;
  professionalHeadline: string;
  summary: string;
  hourRate: string;
}


