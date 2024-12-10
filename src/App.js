import React, { useState, useEffect } from "react";
import PostList from "./components/PostList";
import PostDetails from "./components/PostDetails";
import AddPostForm from "./components/AddPostForm";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const filteredPosts = currentPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const selectPost = (post) => {
    setSelectedPost(post);
  };

  const clearSelectedPost = () => {
    setSelectedPost(null);
  };

  return (
    <div className="app-container">
      <h1>Infimatrix Assignment</h1>
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <AddPostForm addPost={addPost} />
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {selectedPost ? (
            <PostDetails post={selectedPost} onClose={clearSelectedPost} />
          ) : (
            <PostList
              posts={filteredPosts}
              selectPost={selectPost}
              deletePost={deletePost}
            />
          )}
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(posts.length / postsPerPage) },
              (_, index) => index + 1
            ).map((number) => (
              <button key={number} onClick={() => paginate(number)}>
                {number}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
