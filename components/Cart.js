/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useUser } from './User';
import CartStyles from './styles/CartStyles';
import SupremeStyles from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';

const CartItemListStyles = styled.ul`
  overflow: auto !important;
`;

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    width: 100px;
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
  const { product } = cartItem;
  if (!product) return null;
  console.log(product);
  return (
    <CartItemStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}=
          <em>
            [{cartItem.quantity} &times; {formatMoney(product.price)} each]
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();
  if (!me) return <p> Please log in to view Cart. </p>;
  console.log('User: ', me);
  return (
    <CartStyles open>
      <header>
        <SupremeStyles>{me.name}'s Cart</SupremeStyles>
      </header>
      <CartItemListStyles>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </CartItemListStyles>
      {/* TOTAL VALUE */}
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}
