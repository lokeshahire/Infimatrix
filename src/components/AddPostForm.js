import React, { useState } from "react";

const AddPostForm = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      const newPost = {
        id: Date.now(),
        title,
        body,
      };
      addPost(newPost);
      setTitle("");
      setBody("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-post-form">
      <h2>Add New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      ></textarea>
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPostForm;
