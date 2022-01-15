import Link from 'next/link';
import SignOut from '../components/SignOut';
import NavStyles from '../components/styles/NavStyles';
import { useUser } from '../components/User';
import Dot from '../components/CartCount';
import { useCart } from '../lib/cartState';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
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
          <button type="button" onClick={openCart}>
            My Cart
            <Dot
              count={user.cart.reduce(
                (tally, cartItem) => tally + cartItem.quantity,
                0
              )}
            />
          </button>
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
