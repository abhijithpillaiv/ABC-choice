import React from 'react'
import Post from "../post/Post";
import "./posts.css";

export default function Posts({posts}) {
  return (
    <div className="posts">
      {console.log(posts)}
      {posts ? posts.map((p) => (
        <Post post={p} />
      )) : <h1> Waiting for the post</h1>}
    </div>
  );
}
