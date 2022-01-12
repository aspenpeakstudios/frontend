/* eslint-disable react/jsx-no-bind */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

export default function SignIn() {
  // SUMMARY:  Create form with Username and Password

  // GRAPHQL QUERIES
  const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
      authenticateUserWithPassword(email: $email, password: $password) {
        ... on UserAuthenticationWithPasswordSuccess {
          item {
            id
            email
            name
          }
        }
        ... on UserAuthenticationWithPasswordFailure {
          code
          message
        }
      }
    }
  `;

  // FORM INPUTS
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  // GRAPHSQL QUERY AND RESPONSE
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refect the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  // HANDLE SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    // Send the email and password to the graphql API
    const res = await signin();
    console.log(res);
    resetForm();
  }

  //
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  // JSX FORM
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
}
