import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from '../queries';

function AddBook() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const { loading, error, data: authorData } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(
    ADD_BOOK,
    {
      update(cache, { data: { addBook } }) {
        console.log(cache.readQuery({ query: GET_BOOKS }));
        const { books } = cache.readQuery({ query: GET_BOOKS });
        cache.writeQuery({
          query: GET_BOOKS,
          data: { books: books.concat([addBook]) },
        });
      }
    }
  );

  let authors;
  if (loading) authors = <option>Loading author data...</option>;
  else if (error) authors = <option>Error loading data :(</option>
  else authors = authorData.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ variables: { name, genre, authorId } });
    setName('');
    setGenre('');
    setAuthorId('');
  }

  return (
    <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
            <label>Book name:</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div className="field">
            <label>Author:</label>
            <select onChange={(e) => setAuthorId(e.target.value)}>
              <option>Select author</option>
              {authors}
            </select>
        </div>
        <button type="submit">+</button>
    </form>
  )
}

export default AddBook;
