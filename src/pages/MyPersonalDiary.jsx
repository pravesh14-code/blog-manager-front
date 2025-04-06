import React from 'react';
import BlogGridLayout from '../sections/BlogGridLayout';
import { blogs, users } from '../data/dummyData';

const MyPersonalDiary = () => {
  const currentUser = users[0]; 

  const privateBlogs = blogs.filter(
    blog => blog.isPrivate && blog.authorId === currentUser.id
  );

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-2">Personal Diary</h1>
      <p className="text-gray-600 mb-6">
        These are your private and personal blog entries, visible only to you.
      </p>
      <BlogGridLayout blogs={privateBlogs} />
    </div>
  );
};

export default MyPersonalDiary;
