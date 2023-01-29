import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fectAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8888/blogs")
        setBooks(res.data);
        console.log(res);

      } catch (err) {
        console.log(err);
      }
    }
    fectAllBooks();
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8888/blogs/" + id)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>Book Shop</h1>
      {books.map(book => (
        <div className='book' key={book.id}>
          {book.img && <img src={book.img} alt='' />}
          <h2>{book.title}</h2>
          <p>{book.content}</p>
          <span>{book.extra && book.extra}</span>
          <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
          <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
        </div>
      ))}
      <button><Link to="/add">Add New Book</Link></button>
    </>
  )
}

export default Books
