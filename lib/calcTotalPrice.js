export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    // Products can be deleted but they still can be in a cart.  Weird edge case.
    if (!cartItem.product) return tally;

    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
