import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
  const [book, setBook] = useState({
    desc: "",
    title: "",
    connicallink: "",
    img: "",
    content: "",
    extra: ""
  })

  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.put("http://localhost:8888/blogs/"+location.pathname.split("/")[2], book)
      navigate("/");
    } catch (err) {
      console.log(err)
    }

  }

  console.log(book)

  return (
    <div className='from'>
      <h1>Update the Book</h1>
      <input type="text" placeholder='desc for meta tag' onChange={handleChange} name="desc" />
      <input type="text" placeholder='title' onChange={handleChange} name="title" />
      <input type="text" placeholder='connicallink' onChange={handleChange} name="connicallink" />
      <input type="text" placeholder='img url' onChange={handleChange} name="img" />
      <input type="text" placeholder='content' onChange={handleChange} name="content" />
      <input type="text" placeholder='extra' onChange={handleChange} name="extra" />
      <button className='fromButton' onClick={handleClick}>Update blogs</button>
    </div>
  )
}

export default Update
