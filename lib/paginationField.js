import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // Tells Apollo we will take care of everything.
    read(existing = [], { args, cache }) {
      // console.log('pagination fields: ', { existing, args, cache });
      const { skip, first } = args;

      // Read the number of items on the page from the cache.
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      // console.log('After query:', data);
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if we have existing items, and removed undefined (ie filter).
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // Handle last page
      // If there are items AND there aren't enough items for a full page (how many were requested),
      // AND we are on the last page, just send it.
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them.
        return false;
      }

      // If there are items, reutrn them from the cache and we don't need
      // to go to the network.
      if (items.length) {
        // console.log(`There are ${items.length} in the cache.  Send them to Apollo`);
        return items;
      }

      return false; // fallback

      // Apollo:  first thing it does is ask ready function for items
      // we can either do one of two things:
      // 1.  First thing is return items b/c they are already in cache
      // 2.  Or return false which will make network request.
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the Apollo client comes back from the network
      // with our products.
      // console.log('Merging items from the network: ', incoming.length);
      const merged = existing ? existing.slice(0) : [];

      // Get ready for this hack!
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // console.log(merged);
      return merged;
    },
  };
}
