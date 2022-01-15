/* eslint-disable react/jsx-props-no-spreading */
import { useLazyQuery } from '@apollo/client';
// import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
// import debounce from 'lodash.debounce';
import { SearchStyles, DropDown, DropDownItem } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

// export default function Search() {
//   return (
//     <div>
//       <p>Search</p>
//     </div>
//   );
// }

export default function Search() {
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  console.log('Data: ', data);

  // Make sure we only make a network call after user has stopped typing
  // const findItemsButChill = debounce(findItems, 350);

  // Fixes any server side rendering issues with Downshift.
  // resetIdCounter();

  // 3rd party package - Downshift for dropdown menu
  // const { inputValue, getMenuProps, getInputProps, getComboboxProps } =
  //   useCombobox({
  //     items: [],
  //     onInputValueChange() {
  //       console.log('input changed');
  //       findItems();
  //       // findItemsButChill({
  //       //   variables: {
  //       //     searchTerm: inputValue,
  //       //   },
  //       // });
  //     },
  //     onSelectedItemChange() {
  //       console.log('Selected Item Change');
  //     },
  //   });
  return (
    // <SearchStyles>
    //   <div {...getComboboxProps()}>
    //     <input
    //       {...getInputProps({
    //         type: 'search',
    //         placeholder: 'Search for an item',
    //         id: 'search',
    //         className: 'loading',
    //       })}
    //     />
    //   </div>
    //   <DropDown {...getMenuProps()}>
    //     {/* <DropDownItem>Item 1</DropDownItem>
    //     <DropDownItem>Item 2</DropDownItem>
    //     <DropDownItem>Item 3</DropDownItem>
    //     <DropDownItem>Item 4</DropDownItem> */}
    //   </DropDown>
    // </SearchStyles>

    <div>
      <p>Search</p>
    </div>
  );
}
