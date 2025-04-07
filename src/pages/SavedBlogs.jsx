import React, { useState, useEffect } from 'react';
import BlogGridLayout from '../sections/BlogGridLayout';
import { getAllSavedBlogs } from '../api/blogApi';
import { RingLoader } from 'react-spinners';

const SavedBlogs = () => {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      try {
        const blogs = await getAllSavedBlogs(token);
        setSavedBlogs(blogs);
        setLoading(false);
      } catch (err) {
        setError('Failed to load saved blogs');
        setLoading(false);
      }
    };

    if (token) {
      fetchSavedBlogs();
    }
  }, [token]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <RingLoader color="#f59e0b" size={60} />
    </div>
  ); if (error) return <div>{error}</div>;

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-2">Saved Blogs</h1>
      <p className="text-gray-600 mb-6">
        Your saved blogs, ready to revisit whenever you need inspiration or ideas.
      </p>
      <BlogGridLayout blogs={savedBlogs} />
    </div>
  );
};

export default SavedBlogs;
