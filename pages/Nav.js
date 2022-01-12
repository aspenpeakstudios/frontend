import Link from 'next/link';
import SignOut from '../components/SignOut';
import NavStyles from '../components/styles/NavStyles';
import { useUser } from '../components/User';

export default function Nav() {
  const user = useUser();
  console.log(user);
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {/* If user is logged in */}
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
        </>
      )}
      {/* If user is NOT logged in */}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
