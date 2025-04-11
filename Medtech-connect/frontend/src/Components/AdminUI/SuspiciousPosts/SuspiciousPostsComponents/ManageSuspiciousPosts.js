import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaRegComment,
  FaUser,
  FaStar,
  FaCheckCircle,
  FaTrash,
  FaThumbsUp,
} from "react-icons/fa";

const ManageSuspiciousPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    axios
      .get("/posts.json")
      .then((res) => {
        // Load all posts that were flagged initially
        const onlyFlagged = res.data.filter((post) => post.status === "Flagged");
        setPosts(onlyFlagged);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load suspicious posts:", err);
        setLoading(false);
      });
  }, []);

  const formatDate = (isoString) =>
    new Date(isoString).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const toggleComments = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const updatePostStatus = (postId, newStatus) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, status: newStatus } : post
      )
    );
  };

  const deletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    }
  };

  const updateCommentStatus = (postId, commentId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, status: "Approved" }
                  : comment
              ),
            }
          : post
      )
    );
  };

  const deleteComment = (postId, commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
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

  if (loading) return <div className="text-white p-6">Loading suspicious posts...</div>;

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-red-400">
        🚨 Suspicious Posts Management
      </h1>

      {posts.length === 0 ? (
        <p className="mt-4 text-gray-400">No suspicious posts at the moment.</p>
      ) : (
        <div className="space-y-6 mt-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-white text-xl" />
                    <h2 className="text-lg font-semibold">{post.user}</h2>
                    {post.isAlumni && (
                      <FaStar className="text-yellow-500" title="Alumni" />
                    )}
                  </div>
                  <span className="text-sm text-gray-400 sm:ml-2">
                    • {post.creationDate ? formatDate(post.creationDate) : "Unknown date"}
                  </span>
                </div>

                {post.status === "Approved" && (
                  <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-500 text-white">
                    Approved
                  </span>
                )}
              </div>

              <p className="mt-2 text-gray-300">{post.content}</p>

              <div className="mt-3 flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <FaThumbsUp /> <span>{post.likes}</span>
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer hover:text-red-400 transition"
                  onClick={() => toggleComments(post.id)}
                >
                  <FaRegComment /> <span>{post.comments.length}</span>
                </div>
              </div>

              <div className="mt-3 flex justify-end gap-3">
                {post.status !== "Approved" && (
                  <button
                    onClick={() => updatePostStatus(post.id, "Approved")}
                    className="px-3 py-1 bg-green-500 rounded hover:bg-green-600 transition flex items-center gap-1"
                  >
                    <FaCheckCircle /> Approve
                  </button>
                )}
                <button
                  onClick={() => deletePost(post.id)}
                  className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700 transition flex items-center gap-1"
                >
                  <FaTrash /> Remove
                </button>
              </div>

              {expandedPost === post.id && (
                <div className="mt-4 border-t border-gray-700 pt-3">
                  <h5 className="font-medium text-white">Comments</h5>
                  <ul className="mt-2 space-y-2">
                    {post.comments.map((comment) => (
                      <li
                        key={comment.id}
                        className={`flex justify-between items-center text-sm text-slate-400 p-3 rounded ${
                          comment.status === "Approved"
                            ? "bg-green-700 text-white"
                            : "bg-gray-700"
                        }`}
                      >
                        <span>
                          <strong className="text-white">{comment.user}:</strong>{" "}
                          {comment.text}
                        </span>
                        <div className="flex gap-2">
                          {comment.status !== "Approved" && (
                            <button
                              className="text-green-400 hover:text-green-500 cursor-pointer flex items-center gap-1"
                              onClick={() =>
                                updateCommentStatus(post.id, comment.id)
                              }
                            >
                              <FaCheckCircle />
                            </button>
                          )}
                          <FaTrash
                            className="text-red-400 hover:text-red-500 cursor-pointer"
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
      )}
    </div>
  );
};

export default ManageSuspiciousPosts;
