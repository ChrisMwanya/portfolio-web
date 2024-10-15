import { gql } from '@apollo/client';
import { client } from './graphql';
import useAuthStore from '../store/auth';

interface LoginResponse {
  login: {
    jwt: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  };
}

const LOGIN_MUTATION = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export async function login(identifier: string, password: string) {
  const { data } = await client.mutate<LoginResponse>({
    mutation: LOGIN_MUTATION,
    variables: {
      input: {
        identifier,
        password,
      },
    },
  });

  const { jwt, user } = data?.login ?? {};
  const setAuth = useAuthStore.getState().login;
  setAuth(user ?? { id: '', username: '', email: '' }, jwt ?? '');
}
