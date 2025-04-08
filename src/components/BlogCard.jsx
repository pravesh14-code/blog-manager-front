import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit3, Trash2, MessageCircle } from 'lucide-react';
import DefaultProfile from '../assets/default_profile.jpg';
import BlogDefaultWallPaper from '../assets/blog_default_wallpaper.jpg';
import DeleteBlog from '../components/DeleteBlog';
import LikeBlog from '../components/LikeBlog';
import SavedBlog from './SavedBlog';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  console.log("blogContainer", blog);
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData?.id;

  const liked = blog.likesBy?.some(entry => entry.user_id === userId);
  const saved = blog.savedBy?.some(entry => entry.user_id === userId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsModalOpen(false);
  };  

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/blog-management/${blog.id}`);
  };

  return (
    <Link to={`/blog/${blog.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[400px] flex flex-col transform transition duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
        <div className="relative flex-shrink-0 h-2/3">
          <img
            src={blog.media[0] || BlogDefaultWallPaper}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-sm font-semibold px-3 py-1 rounded-full">
            {blog.category}
          </span>

          <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full">
            <img
              src={blog.user.profile_pic || DefaultProfile}
              alt={blog.user.full_name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-white">{blog.user.full_name}</span>
          </div>
        </div>

        <div className="flex flex-col justify-between flex-grow p-4 text-left">
          <div className="flex items-center justify-between text-sm text-gray-700 mb-1">
            <span>{blog.created_at}</span>
            <div className="flex items-center gap-4 text-gray-600">
              {blog.is_public && (
                <>
                  <LikeBlog
                    postId={blog.id}
                    initialLiked={liked}
                    initialLikeCount={blog.likeCount}
                  />
                  <SavedBlog postId={blog.id} initialSaved={saved} />
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {blog.commentCount}
                  </span>
                </>
              )}

              {userId === blog.user_id && (
                <>
                  <button onClick={handleEditClick}>
                    <Edit3 className="w-4 h-4 text-yellow-600 hover:text-yellow-700" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteClick}>
                    <Trash2 className="w-4 h-4 text-red-600 hover:text-red-700" />
                  </button>
                  <DeleteBlog
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    blogId={blog.id}
                    onDeleted={handleCloseModal}
                  />
                </>
              )}
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {blog.title}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-2">
            {blog.content}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
