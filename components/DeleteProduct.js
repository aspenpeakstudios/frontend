/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

// Evicts deleted product from cache
function updateProductCache(cache, payload) {
  console.log(payload);
  console.log('Running the update function after Delete');
  // Find item in cache
  const productInCache = cache.identify(payload.data.deleteProduct);
  cache.evict(productInCache);
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },

      // update the cache after item is deleted
      update: updateProductCache,
    }
  );
  return (
    <button
      disabled={loading}
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          // go ahead and delete it
          console.log('Delete');
          const res = deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
