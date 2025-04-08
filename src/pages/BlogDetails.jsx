import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getById } from '../api/blogApi';
import {
  createComment,
  updateComment,
  deleteComment,
} from '../api/commentApi';
import { Edit, Trash2 } from 'lucide-react';
import { RingLoader } from 'react-spinners';
import DefaultProfile from '../assets/default_profile.jpg';
import DeleteBlog from '../components/DeleteBlog';
import BlogDefaultWallPaper from '../assets/blog_default_wallpaper.jpg';
import LikeBlog from '../components/LikeBlog';
import SavedBlog from '../components/SavedBlog';
import { Helmet } from 'react-helmet';

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const currentUserId = user?.id;
  const currentUserName = user?.full_name;
  const token = localStorage.getItem('token');

  const handleDeleteClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getById(id);
        console.log("blogData", blogData);
        setBlog(blogData);
        setComments(blogData.comments || []);
        setLikesCount(blogData.likes?.length || 0);
        setLiked(blogData.likes?.some(like => like.user_id === currentUserId));
        setSaved(blogData.savedBy?.some(entry => entry.user_id === currentUserId));
      } catch (error) {
        console.error('Error fetching blog details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, currentUserId]);

  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      setSubmittingComment(true);
      try {
        const newComment = await createComment(id, commentText, token);
        setComments((prev) => [...prev, newComment]);
        setCommentText('');
      } catch (error) {
        console.error('Error creating comment:', error);
      } finally {
        setSubmittingComment(false);
      }
    }
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentText(comment.content);
  };

  const handleUpdateComment = async () => {
    try {
      const updated = await updateComment(editingCommentId, editedCommentText, token);
      const updatedList = comments.map((c) =>
        c.id === editingCommentId ? updated : c
      );
      setComments(updatedList);
      setEditingCommentId(null);
      setEditedCommentText('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId, token);
      const updated = comments.filter((c) => c.id !== commentId);
      setComments(updated);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    navigate(`/blog-management/${blog.id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RingLoader color="#f59e0b" size={60} />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog | BlogNest</title>
      </Helmet>
      <div className={`container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-8xl ${!blog.is_public
        ? 'flex flex-col items-center text-center gap-6'
        : 'grid grid-cols-1 lg:grid-cols-3 gap-10'
        }`}>
        <div className="lg:col-span-2">
          <div className="mb-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{blog.title}</h1>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold w-fit">
                {blog.category}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-1">
              By <strong className="text-gray-800">{blog.author.full_name}</strong>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(blog.created_at).toLocaleDateString('en-GB')}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-left">
            {blog.is_public && (
              <>
                <LikeBlog
                  postId={blog.id}
                  initialLiked={liked}
                  initialLikeCount={likesCount}
                  variant="details"
                  onLikeToggle={(newLiked, newCount) => {
                    setLiked(newLiked);
                    setLikesCount(newCount);
                  }}
                />
                <SavedBlog postId={blog.id} initialSaved={saved} />
                <span className="text-sm text-gray-500 ml-auto">
                  {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                </span>
              </>
            )}

            {currentUserId === blog.user_id && (
              <>
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 text-sm font-medium text-yellow-600 hover:text-yellow-700"
                >
                  <Edit className="w-5 h-5" /> Edit
                </button>
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <DeleteBlog
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  blogId={id}
                />
              </>
            )}
          </div>

          <img
            src={blog.media[0]?.media_data || BlogDefaultWallPaper}
            alt={blog.title}
            className="w-full h-60 sm:h-80 md:h-[400px] object-cover rounded-lg mb-6"
          />

          <div className="prose max-w-none mb-8 text-left">
            <p>{blog.content}</p>
          </div>
        </div>

        {blog.is_public && (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow border h-fit">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>

            <ul className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
              {comments.map((comment) => {
                const isMine = comment.user_id === currentUserId;
                const commentUser = {
                  username: comment.author?.full_name || `User ${comment.user_id}`,
                  profile_pic: comment.author?.profile_pic || DefaultProfile
                };

                return (
                  <li key={comment.id} className="flex flex-col sm:flex-row items-start gap-3 border-b pb-4">
                    <img
                      src={commentUser.profile_pic}
                      alt={commentUser.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-semibold text-gray-700">
                          {comment.user_id === currentUserId ? currentUserName : commentUser.username}
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(comment.created_at).toLocaleString()}
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
                              disabled={editedCommentText.trim() === comment.content.trim()}
                              className={`text-sm px-3 py-1 rounded transition ${editedCommentText.trim() === comment.content.trim()
                                ? 'bg-gray-300 text-white cursor-not-allowed'
                                : 'bg-yellow-600 text-white hover:bg-yellow-700'
                                }`}
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
                          <p className="text-gray-600 mt-1">{comment.content}</p>
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
                className="mt-3 px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition w-full flex justify-center items-center"
              >
                {submittingComment ? (
                  <RingLoader color="#fff" size={20} />
                ) : (
                  'Comment'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>

  );
};

export default BlogDetails;
