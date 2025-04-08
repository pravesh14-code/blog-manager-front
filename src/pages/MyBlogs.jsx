import React, { useState, useEffect } from 'react';
import BlogGridLayout from '../sections/BlogGridLayout';
import { getMyBlogs } from '../api/blogApi';
import { RingLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

const MyBlogs = () => {
  const [myBlogs, setmyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const blogs = await getMyBlogs(token);
        setmyBlogs(blogs);
        setLoading(false);
      } catch (err) {
        setError('Failed to load my blogs');
        setLoading(false);
      }
    };

    if (token) {
      fetchMyBlogs();
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
        <title>My Blogs | BlogNest</title>
      </Helmet>
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold mb-2">My Blogs</h1>
        <p className="text-gray-600 mb-6">
          Explore your blogs that you have wrote.
        </p>
        <BlogGridLayout blogs={myBlogs} />
      </div>
    </>

  );
};

export default MyBlogs;
