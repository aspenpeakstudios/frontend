/* eslint-disable react/jsx-no-bind */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import styled, { keyframes } from 'styled-components';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';

const fadeInAnimation = keyframes`
0% { transform: translateX(-1rem); opacity: 0; }
100% { transform: translate(0); opacity: 1; }
`;

const NotifyUserStyles = styled.div`
  animation-name: ${fadeInAnimation};
  animation-duration: 0.5s;
  animation-iteration-count: 1;
`;

// GRAPHQL QUERIES
const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  // SUMMARY:  Create form with Username and Password

  // FORM INPUTS
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  // GRAPHSQL QUERY AND RESPONSE
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  // HANDLE SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await reset().catch(console.error);
    console.log('Got response back: ', res);
    resetForm();
  }

  // JSX FORM - User has just requested a password reset
  if (data?.redeemUserPasswordResetToken === null) {
    console.log('Data: ', data);
    return <NotifyUserStyles>You can now sign in.</NotifyUserStyles>;
  }

  // HANDLE ERRORS
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  // JSX FORM - Sign Up
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset your password</h2>
      <DisplayError error={error || successfulError} />
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
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
