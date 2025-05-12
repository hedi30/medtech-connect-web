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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageSuspiciousPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentsLoading, setCommentsLoading] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://209.38.178.0/api/services/all-posts-web", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const flagged = res.data.posts.filter((post) => post.flagged === true);
        setPosts(flagged);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load suspicious posts:", err);
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
          headers: { Authorization: `Bearer ${token}` },
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
      console.error("❌ Failed to fetch comments:", err);
    } finally {
      setCommentsLoading(null);
    }
  };

  const approvePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://209.38.178.0/api/services/update-post-web",
        { postId, flagged: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Remove the post from the display after approval
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      toast.success("Post approved successfully.");
    } catch (error) {
      console.error("❌ Failed to approve post:", error);
      toast.error("Failed to approve post.");
    }
  };

  const deletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete("http://209.38.178.0/api/services/delete-post-web", {
          headers: { Authorization: `Bearer ${token}` },
          data: { postId },
        });
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        toast.success("Post deleted.");
      } catch (error) {
        toast.error("Failed to delete post.");
        console.error("❌ Delete post error:", error);
      }
    }
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

  const approvePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, status: "Approved" } : post
      )
    );
    toast.success("Post approved.");
  };

  if (loading)
    return <div className="text-black p-6">Loading suspicious posts...</div>;

  return (
    <div className="bg-white text-black p-6 min-h-screen">
      <ToastContainer position="bottom-right" autoClose={2500} />
      <h1 className="text-3xl font-bold text-[#3881a5]">
        🚨 Suspicious Posts Management
      </h1>

      {posts.length === 0 ? (
        <p className="mt-4 text-gray-400">No suspicious posts at the moment.</p>
      ) : (
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
                  {post.isAlumni && (
                    <FaStar className="text-yellow-500" title="Alumni" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {post.createdAt
                      ? formatDate(post.createdAt)
                      : "Unknown date"}
                  </span>
                  {post.status === "Approved" && (
                    <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 font-medium rounded-full border border-green-300">
                      Approved
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-2 text-gray-800">{post.postText}</p>

              <div className="mt-3 flex items-center gap-4 text-[#3881a5]">
                <div className="flex items-center gap-2">
                  <FaThumbsUp /> <span>{post._count?.like || 0}</span>
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer hover:text-red-400 transition"
                  onClick={() => toggleComments(post.id)}
                >
                  <FaRegComment /> <span>{post._count?.comments || 0}</span>
                </div>
              </div>

              <div className="mt-3 flex justify-end gap-3">
                <button
                  onClick={() => approvePost(post.id)}
                  className="px-4 py-1.5 text-green-600 border border-green-500 rounded hover:bg-green-500 hover:text-white transition flex items-center gap-2"
                >
                  <FaCheckCircle /> Approve Post
                </button>
                <button
                  onClick={() => handleDeleteRequest(post.id)}
                  className="px-4 py-1.5 text-red-600 border border-red-500 rounded hover:bg-red-500 hover:text-white transition flex items-center gap-2"
                >
                  <FaTrash /> Remove Post
                </button>
              </div>

              {expandedPost === post.id && (
                <div className="mt-4 pt-3 border-t border-gray-300">
                  <h5 className="font-medium text-[#3881a5]">Comments</h5>
                  {commentsLoading === post.id ? (
                    <p className="text-sm text-gray-400">Loading comments...</p>
                  ) : post.comments?.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {post.comments.map((comment) => (
                        <li
                          key={comment.id}
                          className={`flex justify-between items-center text-sm p-3 rounded-md shadow-sm border ${
                            comment.status === "Approved"
                              ? "bg-[#d0f0c0] text-black"
                              : "bg-[#f5f5f5] text-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={comment.User?.imageUri}
                              alt="avatar"
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <strong>{comment.User?.name || "Unknown"}:</strong>
                            <span>{comment.comment}</span>
                          </div>
                          <div className="flex gap-2">
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
      )}

      <DeleteConfirmationDialog
        open={confirmDialogOpen}
        handleClose={() => setConfirmDialogOpen(false)}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ManageSuspiciousPosts;
