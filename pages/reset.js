/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  console.log(query);
  if (!query?.token) {
    return (
      <div>
        <p> Sorry, you must supply a token. </p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset your password. {query.token} </p>
      <Reset token={query.token} />
    </div>
  );
}

//  http://localhost:7777/reset?token=MvCfLBwk5yJBIZH1hyQ2
