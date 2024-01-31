import React, { useState, useEffect } from "react";

import Comments from "./Comments";

type Post = {
  id: number;
  title: string;
  body: string;
};

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<number | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5",
      );
      const data: Post[] = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const toggleComments = (postId: number) => {
    if (activePost === postId) {
      setActivePost(null);
    } else {
      setActivePost(postId);
    }
  };

  const closeComments = () => {
    setActivePost(null);
  };

  return (
    <div style={{ marginRight: "1.5rem", marginLeft: "0.5rem" }}>
      <div className="container">
        <div className="columns is-multiline">
          {posts.map((post) => (
            <div
              className="column is-full-mobile is-one-third-tablet is-half-desktop"
              key={post.id}
            >
              <div className="section box">
                <h2 className="title is-4">{post.title.substring(0, 50)}</h2>
                {activePost === post.id && (
                  <Comments postId={post.id} onClose={closeComments} />
                )}
                <p className="my-4">{post.body}</p>
                <button
                  className="button is-link is-light"
                  onClick={() => toggleComments(post.id)}
                >
                  Show Comments
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
