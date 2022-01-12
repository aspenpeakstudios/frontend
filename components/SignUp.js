/* eslint-disable react/jsx-no-bind */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

export default function SignUp() {
  // SUMMARY:  Create form with Username and Password

  // GRAPHQL QUERIES
  const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
      $email: String!
      $name: String!
      $password: String!
    ) {
      createUser(data: { email: $email, name: $name, password: $password }) {
        id
        email
        name
      }
    }
  `;

  // FORM INPUTS
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  // GRAPHSQL QUERY AND RESPONSE
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refect the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  // HANDLE SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    // Send the email and password to the graphql API
    const res = await signup().catch(console.error);
    console.log(res);
    // console.log(data, loading, error);
    resetForm();
  }

  // JSX FORM - User has just signed up
  if (data?.createUser) {
    return (
      <p>
        Signed up with {data.createUser.email}. Please go ahead and sign in!
      </p>
    );
  }

  if (error) {
    // console.log('Caught GraphQL error: ', error);
    // Duplicate Key
    if (error.message.substring(0, 20).includes('E11000')) {
      console.log('DUPLICATE KEY ERROR');
      error.message =
        'That email has already been used to Sign Up.  Please choose another email, or choose forgot password';
    }
    // Password too short
    if (error.message.substring(0, 20).includes('[password:minLength')) {
      console.log('DUPLICATE KEY ERROR');
      error.message = 'Password must be at least 8 characters';
    }
  }

  // JSX FORM - Sign Up
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For an Account</h2>
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
}
