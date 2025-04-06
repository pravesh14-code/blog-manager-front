import React, { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { blogs, users } from '../data/dummyData';
import { Heart, Bookmark, Edit, Trash2 } from 'lucide-react';

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id);
  const author = users.find((user) => user.id === blog.authorId);
  const currentUser = users[0];

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(blog.comments);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [liked, setLiked] = useState(blog.likes.includes(currentUser.id));
  const [saved, setSaved] = useState(currentUser.saved?.includes(blog.id));
  const [likesCount, setLikesCount] = useState(blog.likes.length);

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      blog.likes.push(currentUser.id);
      setLikesCount((prev) => prev + 1);
    } else {
      blog.likes = blog.likes.filter((id) => id !== currentUser.id);
      setLikesCount((prev) => prev - 1);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    if (!currentUser.saved) currentUser.saved = [];
    if (!saved) {
      currentUser.saved.push(blog.id);
    } else {
      currentUser.saved = currentUser.saved.filter((b) => b !== blog.id);
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        id: `c${comments.length + 1}`,
        userId: currentUser.id,
        text: commentText,
        timestamp: new Date().toLocaleString(),
      };
      const updated = [...comments, newComment];
      blog.comments = updated;
      setComments(updated);
      setCommentText('');
    }
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentText(comment.text);
  };

  const handleUpdateComment = () => {
    const updated = comments.map((c) =>
      c.id === editingCommentId ? { ...c, text: editedCommentText } : c
    );
    blog.comments = updated;
    setComments(updated);
    setEditingCommentId(null);
    setEditedCommentText('');
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    navigate(`/blog-management/${blog.id}`);
  };

  const handleDelete = (commentId) => {
    const updated = comments.filter((c) => c.id !== commentId);
    blog.comments = updated;
    setComments(updated);
  };

  return (
    <div
      className={`container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl ${blog.isPrivate ? 'flex flex-col items-center text-center gap-6' : 'grid grid-cols-1 lg:grid-cols-3 gap-10'
        }`}
    >
      <div className="lg:col-span-2">
        <div className="mb-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{blog.title}</h1>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold w-fit">
              {blog.category}
            </span>
          </div>
          <div className="text-sm text-gray-600 mb-1">
            By <strong className="text-gray-800">{author.username}</strong>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString('en-GB')}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6 text-left">
          {!blog.isPrivate && (
            <>
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 text-sm font-medium ${liked ? 'text-red-600' : 'text-gray-600'
                  } hover:text-red-600 transition`}
              >
                <Heart fill={liked ? 'currentColor' : 'none'} className="w-5 h-5" />
                {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
              </button>

              <button
                onClick={handleSave}
                className={`flex items-center gap-2 text-sm font-medium ${saved ? 'text-yellow-600' : 'text-gray-600'
                  } hover:text-yellow-600 transition`}
              >
                <Bookmark fill={saved ? 'currentColor' : 'none'} className="w-5 h-5" />
                {saved ? 'Saved' : 'Save'}
              </button>

              <span className="text-sm text-gray-500 ml-auto">
                {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
              </span>
            </>
          )}

          {currentUser.id === blog.authorId && (
            <>
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 text-sm font-medium text-yellow-600 hover:text-yellow-700"
              >
                <Edit className="w-5 h-5" /> Edit
              </button>
              <button
                onClick={() => console.log('Delete blog clicked')}
                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" /> Delete
              </button>
            </>
          )}
        </div>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-60 sm:h-80 md:h-[400px] object-cover rounded-lg mb-6"
          />
        )}

        <div className="prose max-w-none mb-8 text-left">
          <p>{blog.content}</p>
        </div>
      </div>

      {!blog.isPrivate && (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow border h-fit">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>

          <ul className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
            {comments.map((comment) => {
              const commentUser = users.find((u) => u.id === comment.userId);
              const isMine = comment.userId === currentUser.id;

              return (
                <li key={comment.id} className="flex flex-col sm:flex-row items-start gap-3 border-b pb-4">
                  <img
                    src={commentUser.profileImage}
                    alt={commentUser.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 text-left">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-semibold text-gray-700">
                        {commentUser.username}
                      </div>
                      <span className="text-xs text-gray-400">
                        {comment.timestamp}
                      </span>
                    </div>

                    {editingCommentId === comment.id ? (
                      <div className="mt-2">
                        <textarea
                          value={editedCommentText}
                          onChange={(e) => setEditedCommentText(e.target.value)}
                          className="w-full border border-gray-300 rounded p-2 mb-2 text-sm focus:ring-yellow-500 focus:outline-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleUpdateComment}
                            className="text-sm px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingCommentId(null)}
                            className="text-sm px-3 py-1 text-gray-500 hover:underline"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-600 mt-1">{comment.text}</p>
                        {isMine && (
                          <div className="flex gap-2 text-gray-400 mt-2">
                            <button onClick={() => handleEdit(comment)}>
                              <Edit className="w-4 h-4 hover:text-yellow-600" />
                            </button>
                            <button onClick={() => handleDelete(comment.id)}>
                              <Trash2 className="w-4 h-4 hover:text-red-600" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <div>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-yellow-500 focus:outline-none"
              rows={4}
              placeholder="Add a comment..."
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-3 px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition w-full"
            >
              Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
