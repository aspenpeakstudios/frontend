/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // This is our own custom provider.  We will store data (state) and
  // functionality in here and anyone can access it via the consumer.

  // Initial state of cart is closed
  const [cartOpen, setCartOpen] = useState(false);
  // const cartOpen = true;

  // Handle Cart Open and Close
  //   function toggleCart() {
  //     setCartOpen(!cartOpen);
  //   }
  function closeCart() {
    setCartOpen(false);
  }
  function openCart() {
    console.log('OPEN CART');
    setCartOpen(true);
  }

  return (
    <LocalStateProvider value={{ cartOpen, closeCart, openCart }}>
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook for accessing the cart local state.
function useCart() {
  // We use a consumer here to access the local state.
  const all = useContext(LocalStateContext);
  return all;
}
export { CartStateProvider, useCart };
