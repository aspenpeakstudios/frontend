/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useUser } from './User';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import SupremeStyles from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import DeleteCartItem from './DeleteCartItem';

const CartItemListStyles = styled.ul`
  overflow: auto !important;
`;

const CalculationStyles = styled.p`
  width: 100%;
  display: flex;
  justify-content: space-between;
  em {
    ext-align: left;
    color: gray;
    font-family: sans-serif;
    letter-spacing: 2px;
  }
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
  return (
    <CartItemStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <CalculationStyles>
          <em>
            [{cartItem.quantity} &times; {formatMoney(product.price)} each]
          </em>
          <span>{formatMoney(product.price * cartItem.quantity)}</span>
          <DeleteCartItem id={cartItem.id} />
        </CalculationStyles>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();

  if (!me) return <p> Please log in to view Cart. </p>;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <SupremeStyles>{me.name}'s Cart</SupremeStyles>
        <CloseButton type="button" onClick={closeCart}>
          &times;
        </CloseButton>
      </header>

      <CartItemListStyles>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </CartItemListStyles>

      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}
