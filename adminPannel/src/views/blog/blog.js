import React, { useEffect, useState } from 'react'
import Posts from "./components/posts/Posts";
import "./blog.css";
import axios from "axios";
import { port } from '../../context/collection';

function Blog() {
  const [posts, setPosts] = useState(null);
  const lodr =true;

  useEffect(() => {
    axios.get(port+'api/recipes').then((response)=>{
      setPosts(response.data)
    })
  },[lodr]);
  return posts ? (
    <span>
      <div className="home">
        <Posts posts={posts} />
      </div>
    </span>
  ):null;
}

export default Blog
