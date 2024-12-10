import React from "react";

const PostDetails = ({ post, onClose }) => {
  return (
    <div className="post-details-container">
      <div className="post-details">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
