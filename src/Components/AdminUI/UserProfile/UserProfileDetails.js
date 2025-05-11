import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaRegComment,
  FaTrash,
  FaThumbsUp,
  FaCheckCircle,
} from "react-icons/fa";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Divider,
  CircularProgress,
  Avatar,
} from "@mui/material";

const UserProfileDetails = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentsLoading, setCommentsLoading] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const token = localStorage.getItem("token");

    axios
      .get("http://209.38.178.0/api/services/getPosts-byUser", {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      })
      .then((res) => {
        setPosts(res.data.posts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch user posts:", err);
        setLoading(false);
      });
  }, [userId]);

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

      const comments = res.data.comment || [];

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, comments } : post
        )
      );
    } catch (err) {
      console.error("❌ Failed to fetch comments:", err);
    } finally {
      setCommentsLoading(null);
    }
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
  };

  if (loading) {
    return (
      <Box p={4}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading posts...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#fff", p: 4, minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#3881a5" }}>
        🛠 Manage User Profile
      </Typography>

      {posts.length === 0 ? (
        <Typography sx={{ mt: 3 }} color="text.secondary">
          No posts available for this user.
        </Typography>
      ) : (
        <Box mt={4} display="flex" flexDirection="column" gap={3}>
          {posts.map((post) => (
            <Paper
              key={post.id}
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: "#f7fafc",
              }}
            >
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar
                    src={post.user?.imageUri}
                    alt={post.user?.name}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography fontWeight="bold" sx={{ color: "black" }}>
                    {post.user?.name || "Unknown"}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {post.createdAt ? formatDate(post.createdAt) : "Unknown date"}
                </Typography>
              </Box>

              <Typography sx={{ mt: 2 }}>{post.postText}</Typography>

              <Box display="flex" gap={3} mt={2} sx={{ color: "#3881a5" }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <FaThumbsUp />
                  <span>{post._count?.like || 0}</span>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ cursor: "pointer", "&:hover": { color: "#3881a5" } }}
                  onClick={() => toggleComments(post.id)}
                >
                  <FaRegComment />
                  <span>{post._count?.comments || 0}</span>
                </Box>
              </Box>

              <Box mt={2} textAlign="right">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<FaTrash />}
                  onClick={() => deletePost(post.id)}
                >
                  Remove Post
                </Button>
              </Box>

              {expandedPost === post.id && (
                <Box mt={3}>
                  <Divider />
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    mt={2}
                    sx={{ color: "#3881a5" }}
                  >
                    Comments
                  </Typography>

                  {commentsLoading === post.id ? (
                    <Typography variant="body2" color="text.secondary" mt={2}>
                      Loading comments...
                    </Typography>
                  ) : post.comments?.length > 0 ? (
                    <Box mt={2} display="flex" flexDirection="column" gap={1}>
                      {post.comments.map((comment) => (
                        <Paper
                          key={comment.id}
                          sx={{
                            p: 2,
                            backgroundColor:
                              comment.status === "Approved"
                                ? "#d0f0c0"
                                : "#f5f5f5",
                          }}
                        >
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2">
                              <strong>{comment.User?.name || "Unknown"}:</strong>{" "}
                              {comment.comment}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="caption" color="text.secondary">
                                {comment.createdAt
                                  ? new Date(comment.createdAt).toLocaleString(undefined, {
                                      dateStyle: "short",
                                      timeStyle: "short",
                                    })
                                  : "N/A"}
                              </Typography>
                              {comment.status !== "Approved" && (
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() =>
                                    updateCommentStatus(post.id, comment.id)
                                  }
                                >
                                  <FaCheckCircle />
                                </IconButton>
                              )}
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() =>
                                  deleteComment(post.id, comment.id)
                                }
                              >
                                <FaTrash />
                              </IconButton>
                            </Box>
                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary" mt={2}>
                      No comments available.
                    </Typography>
                  )}
                </Box>
              )}
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UserProfileDetails;
