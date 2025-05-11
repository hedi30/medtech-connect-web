import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaRegComment,
  FaUser,
  FaTrash,
  FaThumbsUp,
  FaCheckCircle,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagePostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentsLoading, setCommentsLoading] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://209.38.178.0/api/services/all-posts-web", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const unflaggedPosts = res.data.posts.filter((post) => post.flagged === false);
        setPosts(unflaggedPosts);
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

  const deletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete("http://209.38.178.0/api/services/delete-post", {
          headers: { Authorization: `Bearer ${token}` },
          data: { postId },
        });
        setPosts(posts.filter((post) => post.id !== postId));
        toast.success("Post deleted.");
      } catch (error) {
        toast.error("Failed to delete post.");
        console.error("❌ Delete post error:", error);
      }
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
      toast.success("Comment deleted.");
    }
  };

  const approveComment = (postId, commentId) => {
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

  if (loading) return <div className="text-black p-6">Loading posts...</div>;

  return (
    <div className="bg-white text-black p-6 min-h-screen">
      <ToastContainer position="bottom-right" autoClose={2500} />

      <h1 className="text-3xl font-bold text-[#3881a5]">
        🛠 Manage Posts & Comments
      </h1>

      <div className="space-y-6 mt-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 bg-[#f7fafc] rounded-lg shadow-md border"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={post.user?.imageUri}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <h2 className="text-lg font-semibold">
                  {post.user?.name || "Unknown"}
                </h2>
              </div>
              <span className="text-sm text-gray-500">
                {post.createdAt ? formatDate(post.createdAt) : "Unknown date"}
              </span>
            </div>

            <p className="mt-2 text-gray-800">{post.postText}</p>

            <div className="mt-3 flex items-center gap-4 text-[#3881a5]">
              <div className="flex items-center gap-2">
                <FaThumbsUp /> <span>{post._count?.like || 0}</span>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-indigo-400 transition"
                onClick={() => toggleComments(post.id)}
              >
                <FaRegComment /> <span>{post._count?.comments || 0}</span>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={() => deletePost(post.id)}
                className="px-4 py-1.5 text-red-600 border border-red-500 rounded hover:bg-red-500 hover:text-white transition flex items-center gap-2"
              >
                <FaTrash /> Remove Post
              </button>
            </div>

            {expandedPost === post.id && (
              <div className="mt-4 pt-3 border-t border-gray-300">
                <h5 className="font-bold text-[#3881a5]">Comments</h5>

                {commentsLoading === post.id ? (
                  <p className="text-gray-400 mt-3 text-sm">Loading comments...</p>
                ) : post.comments?.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {post.comments.map((comment) => (
                      <li
                        key={comment.id}
                        className={`text-sm p-3 rounded-md shadow-sm border ${
                          comment.status === "Approved"
                            ? "bg-[#d0f0c0] text-black"
                            : "bg-[#f5f5f5] text-gray-700"
                        } shadow-md`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <img
                              src={comment.User?.imageUri}
                              alt="avatar"
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <strong>{comment.User?.name || "Unknown"}:</strong>
                            <span>{comment.comment}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500">
                              {comment.createdAt
                                ? new Date(comment.createdAt).toLocaleString(undefined, {
                                    dateStyle: "short",
                                    timeStyle: "short",
                                  })
                                : "N/A"}
                            </span>
                            {comment.status !== "Approved" && (
                              <FaCheckCircle
                                className="text-green-600 hover:text-green-800 cursor-pointer"
                                onClick={() => approveComment(post.id, comment.id)}
                              />
                            )}
                            <FaTrash
                              className="text-red-400 hover:text-red-500 cursor-pointer"
                              onClick={() => deleteComment(post.id, comment.id)}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic mt-2">
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
