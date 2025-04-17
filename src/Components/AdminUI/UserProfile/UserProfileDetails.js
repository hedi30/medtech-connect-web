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
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-400">
        🛠 Manage User Profile: Alice
      </h1>

      {/* Posts List */}
      <div className="space-y-6 mt-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaUser className="text-white text-xl" />
                <h2 className="text-lg font-semibold">{post.user}</h2>
              </div>
            </div>

            <p className="mt-2 text-gray-300">{post.content}</p>

            {/* Like & Comment Count */}
            <div className="mt-3 flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-2">
                <FaThumbsUp /> <span>{post.likes}</span>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-indigo-400 transition"
                onClick={() => toggleComments(post.id)}
              >
                <FaRegComment /> <span>{post.comments.length}</span>
              </div>
            </div>

            {/* Delete Post */}
            <div className="mt-3 flex justify-end gap-3">
              <button
                onClick={() => deletePost(post.id)}
                className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700 transition flex items-center gap-1"
              >
                <FaTrash /> Remove Post
              </button>
            </div>

            {/* Comments Section */}
            {expandedPost === post.id && (
              <div className="mt-4 border-t border-gray-700 pt-3">
                <h5 className="font-medium text-white">Comments</h5>
                <ul className="mt-2 space-y-2">
                  {post.comments.map((comment) => (
                    <li
                      key={comment.id}
                      className="flex justify-between items-center text-sm text-slate-400 bg-gray-700 p-3 rounded"
                    >
                      <span>
                        <strong className="text-white">{comment.user}:</strong>{" "}
                        {comment.text}
                      </span>
                      <div className="flex gap-2">
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
    </div>
  );
};

export default UserProfileDetails;
