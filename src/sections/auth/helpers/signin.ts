// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

export interface SignInProps {
  identifier: string;
  password: string;
}

export async function signIn({ identifier, password }: SignInProps): Promise<any> {
  const responseSignIn = await axios.post('http://localhost:3000/auth/signin', {
    password,
    identifier,
  });

  localStorage.setItem('token', responseSignIn.data.access_token);
  localStorage.setItem('user', JSON.stringify(responseSignIn.data.user));
  return true;
}
