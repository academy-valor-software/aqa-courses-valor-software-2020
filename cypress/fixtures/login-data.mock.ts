import { LoginDataInterface} from './login-data.interface';

export const invalidLoginEmail: LoginDataInterface = {
    username: 'pionier.adler@',
    password: 'SAM_13_?'
};

export const invalidLoginPassword: LoginDataInterface = {
    username: 'pionier.adler@gmail.com',
    password: 'abc_123'
};

export const passwordErrorMsg = 'Incorrect username or password provided.';

export const emailErrorMsg = 'Please enter a valid username or email address.';
