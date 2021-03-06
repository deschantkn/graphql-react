import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_BOOKS } from '../queries';

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => <li key={book.id}>{book.name}</li>)}
      </ul>
    </div>
  );
}

export default BookList;
