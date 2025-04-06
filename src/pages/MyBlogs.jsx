import React from 'react';
import BlogGridLayout from '../sections/BlogGridLayout';
import { blogs, users } from '../data/dummyData';

const MyBlogs = () => {
  const currentUser = users[0];
  const myBlogs = blogs.filter(blog => blog.authorId === currentUser.id);

  return (
    <>
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold mb-2">My Blogs</h1>
        <p className="text-gray-600 mb-6">
          Here, we share travel tips, destination guides, and stories that inspire your next adventure.
        </p>
        <BlogGridLayout blogs={myBlogs} />
      </div>
    </>
  );
};

export default MyBlogs;
