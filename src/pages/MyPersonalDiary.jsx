import React, { useState, useEffect } from 'react';
import BlogGridLayout from '../sections/BlogGridLayout';
import { getAllPrivateBlogs } from '../api/blogApi';
import { RingLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

const MyPersonalDiary = () => {
  const [privateBlogs, setPrivateBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPrivateBlogs = async () => {
      try {
        const blogs = await getAllPrivateBlogs(token);
        setPrivateBlogs(blogs);
        setLoading(false);
      } catch (err) {
        setError('Failed to load private blogs');
        setLoading(false);
      }
    };

    if (token) {
      fetchPrivateBlogs();
    }
  }, [token]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <RingLoader color="#f59e0b" size={60} />
    </div>
  ); if (error) return <div>{error}</div>;

  return (
    <>
      <Helmet>
        <title>Personal Diary | BlogNest</title>
      </Helmet>
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold mb-2">Personal Diary</h1>
        <p className="text-gray-600 mb-6">
          These are your private and personal blog entries, visible only to you.
        </p>
        <BlogGridLayout blogs={privateBlogs} />
      </div>
    </>

  );
};

export default MyPersonalDiary;
