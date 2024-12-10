import React from "react";

const PostList = ({ posts, selectPost, deletePost }) => {
  return (
    <div className="post-list">
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 50)}...</p>
            <button onClick={() => selectPost(post)}>View Details</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
