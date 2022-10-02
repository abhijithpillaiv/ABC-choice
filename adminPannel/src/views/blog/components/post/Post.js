import React from 'react'
import "./post.css";
import { Link } from "react-router-dom";
import { port } from '../../../../context/collection';

export default function Post({ post }) {
  console.log(post);
  const PF = port+"image/";
  return (
    <div className="post">
      {post.image===undefined?null: <img className="postImg" src={PF + post.image} alt="" />}
      <div className="postInfo">
        <div className="postCats">
        </div>
        <Link to={`/admin/singlePost/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
      </div>

    </div>
  );
}

