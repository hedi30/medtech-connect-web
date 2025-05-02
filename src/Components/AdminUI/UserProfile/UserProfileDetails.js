import React, { useState } from "react";
import { FaRegComment, FaUser, FaTrash, FaThumbsUp } from "react-icons/fa";

const UserProfileDetails = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Alice",
      isAlumni: true,
      likes: 15,
      content: "Exploring AI in Healthcare",
      comments: [
        { id: 101, user: "John", text: "Great post!" },
        { id: 102, user: "Emma", text: "I totally agree!" },
      ],
    },
    {
      id: 2,
      user: "Alice",
      isAlumni: true,
      likes: 8,
      content: "React is amazing for frontend development!",
      comments: [
        { id: 103, user: "Sophia", text: "Interesting perspective." },
        { id: 104, user: "Liam", text: "Could you elaborate more?" },
      ],
    },
  ]);

  const [expandedPost, setExpandedPost] = useState(null);

  const toggleComments = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const deletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  const deleteComment = (postId, commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment.id !== commentId
                ),
              }
            : post
        )
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#3881a5", fontWeight: "bold" }}>
        🛠 Manage User Profile: Alice
      </h1>

      {/* Posts List */}
      <div className="space-y-6 mt-6">
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              padding: "20px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <FaUser style={{ color: "#3881a5", fontSize: "24px" }} />
                <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
                  {post.user}
                </h2>
              </div>
            </div>

            <p style={{ marginTop: "12px", color: "#333" }}>{post.content}</p>

            {/* Like & Comment Count */}
            <div
              style={{
                marginTop: "12px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                color: "#666",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <FaThumbsUp style={{ color: "#3881a5" }} />{" "}
                <span>{post.likes}</span>{" "}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  color: "#3881a5",
                }}
                onClick={() => toggleComments(post.id)}
              >
                <FaRegComment /> <span>{post.comments.length}</span>
              </div>
            </div>

            {/* Delete Post */}
            <div
              style={{
                marginTop: "12px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() => deletePost(post.id)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FaTrash /> Remove Post
              </button>
            </div>

            {/* Comments Section */}
            {expandedPost === post.id && (
              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "12px",
                  borderTop: "1px solid #ddd",
                }}
              >
                <h5
                  style={{
                    fontSize: "16px",
                    color: "#3881a5",
                    fontWeight: "500",
                  }}
                >
                  Comments
                </h5>
                <ul
                  style={{
                    marginTop: "12px",
                    listStyleType: "none",
                    paddingLeft: "0",
                  }}
                >
                  {post.comments.map((comment) => (
                    <li
                      key={comment.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "14px",
                        padding: "12px",
                        borderRadius: "8px",
                        backgroundColor: "#f0f0f0",
                        marginBottom: "8px",
                      }}
                    >
                      <span>
                        <strong style={{ color: "#3881a5" }}>
                          {comment.user}:
                        </strong>{" "}
                        {comment.text}
                      </span>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <FaTrash
                          style={{ color: "#f44336", cursor: "pointer" }}
                          onClick={() => deleteComment(post.id, comment.id)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileDetails;
