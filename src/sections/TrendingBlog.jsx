import React, { useEffect, useState } from "react";
import { blogs, users } from "../data/dummyData";
import { Link } from "react-router-dom";

const TrendingBlogCard = ({ blog, author }) => {
  return (
    <Link to={`/blog/${blog.id}`} className="block">
      <div className="relative w-full h-[600px] sm:h-[600px] md:h-[600px] lg:h-[700px] rounded-xl overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover object-center"
        />

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
                  src={author.profileImage}
                  alt={author.username}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <span className="font-medium text-white text-sm sm:text-base">
                  {author.username}
                </span>
              </div>
              <div className="text-white/80 text-xs sm:text-sm">
                {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const TrendingBlog = () => {
  const TrendingBlogs = blogs
    .filter((blog) => !blog.isPrivate)
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 3); 

  const getUser = (userId) => users.find((user) => user.id === userId);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % TrendingBlogs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [TrendingBlogs.length]);

  return (
    <div className="w-full relative">
      {TrendingBlogs.length > 0 && (
        <TrendingBlogCard
          blog={TrendingBlogs[currentIndex]}
          author={getUser(TrendingBlogs[currentIndex].authorId)}
        />
      )}

      <div className="absolute bottom-4 left-4 sm:left-10 flex gap-2 z-10">
        {TrendingBlogs.map((_, index) => (
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
