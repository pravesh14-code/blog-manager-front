import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from '../assets/default_profile.jpg';
import BlogDefaultWallPaper from '../assets/blog_default_wallpaper.jpg';

const TrendingBlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.id}`} className="block">
      <div
        className="relative w-full h-[600px] sm:h-[600px] md:h-[600px] lg:h-[700px] rounded-xl overflow-hidden"
        style={{ backgroundImage: `url(${blog.media[0] || BlogDefaultWallPaper})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end px-4 sm:px-6 md:px-10 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end text-white w-full mb-4 sm:mb-6 gap-4">
            <div className="max-w-xl text-left">
              <span className="bg-white/30 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 rounded-full inline-block mb-3 sm:mb-4">
                {blog.category}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                {blog.title}
              </h2>
              <p className="text-white/80 text-sm sm:text-base line-clamp-2">
                {blog.content}
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="flex items-center gap-3">
                <img
                  src={blog.user.profile_pic || DefaultProfile}
                  alt={blog.user.full_name}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <span className="font-medium text-white text-sm sm:text-base">
                  {blog.user.full_name}
                </span>
              </div>
              <div className="text-white/80 text-xs sm:text-sm">
                {blog.created_at}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const TrendingBlog = ({ trendingBlogs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingBlogs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [trendingBlogs.length]);

  return (
    <div className="w-full relative">
      {trendingBlogs.length > 0 && (
        <TrendingBlogCard blog={trendingBlogs[currentIndex]} />
      )}

      <div className="absolute bottom-4 left-4 sm:left-10 flex gap-2 z-10">
        {trendingBlogs.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TrendingBlog;
