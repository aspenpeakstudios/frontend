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
const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  // SUMMARY:  Create form with Username and Password

  // FORM INPUTS
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  // GRAPHSQL QUERY AND RESPONSE
  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  // HANDLE SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    // Send the email and password to the graphql API
    const res = await signup().catch(console.error);
    console.log('Got response back: ', res);
    // console.log(data, loading, error);
    resetForm();
  }

  // JSX FORM - User has just requested a password reset
  if (data?.sendUserPasswordResetLink === null) {
    console.log('Data: ', data);
    return (
      <NotifyUserStyles>Success! Check your email for a link!</NotifyUserStyles>
    );
  }

  if (error) {
    console.log('Caught GraphQL error: ', error);
  }

  // JSX FORM - Sign Up
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset my password!</h2>
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
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
