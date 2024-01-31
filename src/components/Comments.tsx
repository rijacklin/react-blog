import React, { useState, useEffect } from "react";

type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

interface CommentsProps {
  postId: number;
  onClose: () => void;
}

const Comments: React.FC<CommentsProps> = ({
  postId,
  onClose,
}: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
      );
      const data: Comment[] = await res.json();
      setComments(data);
    };

    fetchComments();
  }, [postId]);

  return (
    <div className={`modal ${postId ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-content" style={{ overflow: "auto" }}>
        <div className="box">
          <div style={{ marginRight: "1.5rem", marginLeft: "0.5rem" }}>
            <h1 className="title is-2 mx-2 my-4">Comments</h1>
            <hr />
            <div className="columns">
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id}>
                    <div className="column">
                      <h2 className="title is-4">User: {comment.name}</h2>
                      <p>Comment: {comment.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Comments;
