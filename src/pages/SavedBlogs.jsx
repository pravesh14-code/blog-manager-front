import React from 'react';
import BlogGridLayout from '../sections/BlogGridLayout';
import { blogs, users } from '../data/dummyData';

const SavedBlogs = () => {
  const currentUser = users[0]; 
  const savedBlogIds = currentUser.savedPosts || [];

  const savedBlogs = blogs.filter(blog => savedBlogIds.includes(blog.id) && !blog.isPrivate);

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-2">Saved Blogs</h1>
      <p className="text-gray-600 mb-6">
        Here, we share travel tips, destination guides, and stories that inspire your next adventure.
      </p>
      <BlogGridLayout blogs={savedBlogs} />
    </div>
  );
};

export default SavedBlogs;
