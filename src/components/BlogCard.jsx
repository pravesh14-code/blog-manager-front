import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Bookmark, Edit3, Trash2, MessageCircle } from 'lucide-react';
import DefaultProfile from '../assets/default_profile.jpg';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData?.id;

  const [liked, setLiked] = useState(blog.likes && blog.likes.includes(userId));
  const [saved, setSaved] = useState(userData.savedPosts?.includes(blog.id));

  const handleLikeClick = (e) => {
    e.preventDefault();
    setLiked(!liked);
    if (!liked) {
      blog.likes.push(userId);  
    } else {
      blog.likes = blog.likes.filter(id => id !== userId);  
    }
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setSaved(!saved);
    if (!userData.savedPosts) userData.savedPosts = [];  
    if (!saved) {
      userData.savedPosts.push(blog.id);
    } else {
      userData.savedPosts = userData.savedPosts.filter(id => id !== blog.id);
    }
    localStorage.setItem('user', JSON.stringify(userData));  
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    navigate(`/blog-management/${blog.id}`);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    console.log('Delete clicked');
  };

  return (
    <Link to={`/blog/${blog.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[400px] flex flex-col transform transition duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
        <div className="relative flex-shrink-0 h-2/3">
          <img
            src={blog.media[0]}  
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
              {!blog.isPrivate && (
                <>
                  <button onClick={handleLikeClick} className={`flex items-center gap-1 ${liked ? 'text-red-600' : 'hover:text-red-600'}`}>
                    <Heart className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
                    {blog.likeCount}
                  </button>
                  <button onClick={handleSaveClick} className={`flex items-center gap-1 ${saved ? 'text-yellow-600' : 'hover:text-yellow-600'}`}>
                    <Bookmark fill={saved ? 'currentColor' : 'none'} className="w-5 h-5" />
                    {saved ? 'Saved' : 'Save'}
                  </button>
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
                  <button onClick={handleDeleteClick}>
                    <Trash2 className="w-4 h-4 text-red-600 hover:text-red-700" />
                  </button>
                </>
              )}
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
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
