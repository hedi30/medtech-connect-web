import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaRegComment,
  FaUser,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTrash,
  FaThumbsUp,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagePostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentsLoading, setCommentsLoading] = useState(null); // holds postId being loaded

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://209.38.178.0/api/services/all-posts-web", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("✅ Posts fetched from API:", res.data);
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load posts:", err);
        setLoading(false);
      });
  }, []);

  const formatDate = (isoString) =>
    new Date(isoString).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const toggleComments = async (postId) => {
    if (expandedPost === postId) {
      setExpandedPost(null);
      return;
    }

    setExpandedPost(postId);
    setCommentsLoading(postId);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://209.38.178.0/api/services/get-postComment",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { postId },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: res.data.comment || [] }
            : post
        )
      );
    } catch (err) {
      toast.error("Failed to load comments.");
      console.error("❌ Failed to fetch comments:", err);
    } finally {
      setCommentsLoading(null);
    }
  };

  const updatePostStatus = (postId, newStatus) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, status: newStatus } : post
      )
    );
    toast.success(`Post marked as ${newStatus}`);
  };

  const deletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== postId));
      toast.success("Post deleted.");
    }
  };

  const updateCommentStatus = (postId, commentId) => {
    setPosts(
      posts.map((post) =>
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
    toast.success("Comment approved.");
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
      toast.success("Comment deleted.");
    }
  };

  if (loading) return <div className="text-white p-6">Loading posts...</div>;

  return (
    <div className="bg-white text-black p-6 min-h-screen">
      <ToastContainer position="bottom-right" autoClose={2500} />

      <h1 className="text-3xl font-bold text-[#3881a5]">
        {" "}
        🛠 Manage Posts & Comments
      </h1>

      <div className="space-y-6 mt-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <div className="flex items-center gap-2">
                  <FaUser className="text-[#3881a5] text-xl" />
                  <h2 className="text-lg font-semibold">
                    {post.user?.name || "Unknown"}
                  </h2>
                </div>
                <span className="text-sm text-gray-400 sm:ml-2">
                  •{" "}
                  {post.createdAt ? formatDate(post.createdAt) : "Unknown date"}
                </span>
              </div>
            </div>
            <p className="mt-2 text-gray-900">{post.postText}</p>{" "}
            {/* Darker text here */}
            <div className="mt-3 flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-2 text-[#3881a5]">
                <FaThumbsUp /> <span>{post._count?.like || 0}</span>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer text-[#3881a5] hover:text-indigo-400 transition"
                onClick={() => toggleComments(post.id)}
              >
                <FaRegComment /> <span>{post._count?.comments || 0}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-3">
              <button
                onClick={() => updatePostStatus(post.id, "Approved")}
                className="px-3 py-1 bg-green-500 rounded hover:bg-green-600 transition flex items-center gap-1"
              >
                <FaCheckCircle /> Approve
              </button>
              <button
                onClick={() => updatePostStatus(post.id, "Flagged")}
                className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 transition flex items-center gap-1"
              >
                <FaExclamationTriangle /> Flag
              </button>
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

                {commentsLoading === post.id ? (
                  <p className="text-gray-400 mt-3 text-sm">
                    Loading comments...
                  </p>
                ) : post.comments?.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {post.comments.map((comment) => (
                      <li
                        key={comment.id}
                        className={`flex justify-between items-center text-sm p-3 rounded ${
                          comment.status === "Approved"
                            ? "bg-green-700 text-white"
                            : "bg-gray-700 text-slate-400"
                        }`}
                      >
                        <div>
                          <strong className="text-white">
                            {comment.User?.name || "Unknown"}:
                          </strong>{" "}
                          {comment.comment}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-300">
                            {comment.createdAt
                              ? new Date(comment.createdAt).toLocaleString(
                                  undefined,
                                  {
                                    dateStyle: "short",
                                    timeStyle: "short",
                                  }
                                )
                              : "N/A"}
                          </span>
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
                ) : (
                  <p className="text-sm text-gray-400">
                    No comments available.
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePostsPage;
